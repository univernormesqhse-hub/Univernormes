import {Img, interpolate, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, kf, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {CharterDoc, Gear, PhotoCard, RED, Row, Strike, Verdict} from './ui';

const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** 0 – 20,7 s : accroche — le guide de la charte qualité, une feuille de route. */
export const Intro: React.FC = () => {
  const t = useT();
  const eng = useSpring(0.3, {damping: 14});
  const docIn = useSpring(3.3, {damping: 12});
  const write = prog(t, 3.6, 9.5, (v) => v);
  const road = prog(t, 8.6, 10.4, easeInOut);
  const q = t >= 12.4 && t < 19.65;
  const out = prog(t, 20.35, 20.7, easeIn);
  const docX = interpolate(prog(t, 12.2, 12.9, easeInOut), [0, 1], [680, 540]);
  const docScale = interpolate(prog(t, 12.2, 12.9, easeInOut), [0, 1], [1, 0.62]);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Bienvenue dans ce *décryptage*" at={0.1} until={2.15} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Le guide de la *charte qualité*" at={2.2} until={5.25} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Une *feuille de route* claire" at={5.3} until={12.4} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Pourquoi adopter une *charte* ?" at={12.45} until={17.35} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Qu'est-ce que ça *apporte* ?" at={17.4} until={19.65} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Allez, *on y va !*" at={19.7} until={20.6} y={420} size={96} />

      {/* l'ingénieur présentateur */}
      {t < 12.6 && (
        <div style={{position: 'absolute', left: interpolate(eng, [0, 1], [-500, 20]), top: 640, width: 560, opacity: 1 - prog(t, 12.2, 12.6)}}>
          <Img src={staticFile('personnages/ingenieur.png')} style={{width: 560, display: 'block', maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)', filter: 'drop-shadow(0 20px 30px rgba(14,30,60,0.25))'}} />
        </div>
      )}
      {t < 3.3 && (
        <Enter at={0.8} until={3.3} x={790} y={900} bouncy>
          <div style={{background: '#fff', borderRadius: 34, padding: '28px 36px', boxShadow: '0 16px 34px rgba(0,0,0,0.16)', fontFamily: handFont, fontSize: 64, color: colors.navy, textAlign: 'center', lineHeight: 1.05}}>
            Bonjour<br />à tous ! 👋
          </div>
        </Enter>
      )}

      {/* la charte qui s'écrit */}
      {t >= 3.3 && t < 19.7 && (
        <div style={{position: 'absolute', left: docX, top: q ? 1120 : 1030, transform: `translate(-50%, -50%) scale(${docIn * docScale}) rotate(${(1 - docIn) * 8 + (q ? 0 : 3)}deg)`, transition: 'none'}}>
          <CharterDoc w={500} write={write} seal={prog(t, 9.6, 10.2)} />
        </div>
      )}
      {/* feuille de route : chemin pointillé vers la cible */}
      {t >= 8.6 && t < 12.4 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: fade(t, 8.6, 12.4)}}>
          <path d="M150 1560 C 300 1380, 160 1250, 330 1150 S 560 1000, 520 640" fill="none" stroke={colors.green} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - road} />
        </svg>
      )}
      <Enter at={9.0} until={12.4} x={150} y={1500} bouncy><F n="carte" size={150} float={6} /></Enter>
      <Enter at={10.2} until={12.4} x={430} y={620} bouncy><F n="cible" size={130} float={6} /></Enter>
      <Enter at={10.7} until={12.4} x={540} y={1530} bouncy>
        <Pill label="Élever les standards" icon="graphique" size={36} />
      </Enter>

      {/* la grande question */}
      {q && (
        <>
          {[0, 1, 2].map((i) => (
            <Enter key={i} at={12.6 + i * 0.2} until={19.6} x={[200, 880, 860][i]} y={[760, 700, 1330][i]} bouncy rotate={Math.sin(t * 3 + i) * 8}>
              <F n={['question', 'pensif', 'ampoule'][i]} size={[170, 150, 130][i]} float={8} />
            </Enter>
          ))}
          <Enter at={17.9} until={19.6} x={240} y={1360} bouncy>
            <Pill label="Pour l'organisation" icon="batiment" size={32} />
          </Enter>
        </>
      )}
      <Enter at={19.75} until={20.6} x={540} y={1050} from="down" dist={500} bouncy>
        <F n="fusee" size={300} />
      </Enter>
    </div>
  );
};

const MENU = [
  {at: 22.6, icon: 'loupe', label: 'Définir la charte', sub: 'Fondation des standards'},
  {at: 26.8, icon: 'engrenage', label: 'Le pourquoi stratégique', sub: 'Valeur organisationnelle'},
  {at: 28.6, icon: 'trophee', label: 'Les atouts majeurs', sub: 'Impacts de la charte'},
  {at: 32.6, icon: 'equerre', label: 'Méthodologie', sub: 'Construire le cadre'},
  {at: 35.0, icon: 'cible', label: 'Critères de réussite', sub: 'Impact durable'},
];

/** 20,7 – 36,5 s : le sommaire en cinq parties. */
export const Menu: React.FC = () => {
  const t = useT();
  const out = prog(t, 36.2, 36.5, easeIn);
  const cur = MENU.filter((m) => t >= m.at).length - 1;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Au *menu*" at={20.75} until={36.4} y={400} size={96} />
      <Underline at={21.3} until={36.4} x={540} y={460} width={300} />
      {MENU.map((m, i) => (
        <Row key={m.label} at={m.at} y={640 + i * 196} icon={m.icon} label={m.label} sub={m.sub} num={i + 1} color={i === cur ? colors.green : colors.navy} w={940} />
      ))}
      <Enter at={20.9} until={22.5} x={540} y={1050} bouncy>
        <F n="clipboard" size={320} float={6} />
      </Enter>
    </div>
  );
};

/** 42,5 – 68,6 s : définition — un document officiel, approuvé au plus haut niveau. */
export const Definition: React.FC = () => {
  const t = useT();
  const out = prog(t, 68.3, 68.6, easeIn);
  const strike = prog(t, 46.6, 47.4, easeOut);
  const doc = useSpring(49.75, {damping: 12});
  const ladder = prog(t, 52.2, 55.2, easeInOut);
  const tone = t >= 64.8;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="De quoi *parle-t-on* ?" at={42.5} until={44.55} y={420} size={86} />
      <Kinetic text="Pas un bout de *papier*…" at={44.6} until={49.65} y={420} size={80} accent={RED} />
      <Kinetic text="Un document *officiel*" at={49.7} until={55.55} y={420} size={84} />
      <Kinetic text="Son *but* ?" at={55.6} until={64.75} y={420} size={104} />
      <Kinetic text="Elle donne le *ton*" at={64.8} until={68.5} y={420} size={92} />

      <Enter at={42.6} until={44.55} x={540} y={1050} bouncy rotate={Math.sin(t * 4) * 6}>
        <F n="loupe" size={340} float={8} />
      </Enter>

      {/* le papier oublié dans un tiroir */}
      {t >= 44.6 && t < 49.7 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 44.6, 49.7)}}>
          <Enter at={44.7} x={540} y={1060} from="down" dist={300}>
            <svg width={640} height={520} viewBox="0 0 640 520">
              <rect x={20} y={40} width={600} height={460} rx={26} fill="#C99A63" stroke={colors.ink} strokeWidth={8} />
              <rect x={60} y={80} width={520} height={170} rx={16} fill="#B5844F" stroke={colors.ink} strokeWidth={6} />
              <rect x={60} y={290} width={520} height={170} rx={16} fill="#B5844F" stroke={colors.ink} strokeWidth={6} />
              <rect x={260} y={150} width={120} height={26} rx={13} fill={colors.ink} />
              <rect x={260} y={360} width={120} height={26} rx={13} fill={colors.ink} />
              <g transform={`translate(0 ${-130 * prog(t, 45.2, 46.0, easeOut)})`}>
                <rect x={180} y={60} width={280} height={120} rx={6} fill="#F6F1E4" stroke="#B8AE96" strokeWidth={4} transform="rotate(-6 320 120)" />
                <path d="M210 95 H420 M210 120 H390 M210 145 H360" stroke="#C7BFA9" strokeWidth={8} transform="rotate(-6 320 120)" />
              </g>
            </svg>
          </Enter>
          <div style={{position: 'absolute', left: 230, top: 900, width: 620}}>
            <Strike p={strike} w={600} />
          </div>
          <Enter at={47.5} x={540} y={1420} bouncy>
            <Pill label="Pas un papier administratif" color={RED} icon="memo" size={36} />
          </Enter>
        </div>
      )}

      {/* le document officiel + l'échelle d'approbation */}
      {t >= 49.7 && t < 55.6 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 49.7, 55.6)}}>
          <div style={{position: 'absolute', left: 320, top: 1040, transform: `translate(-50%, -50%) scale(${doc * 0.86}) rotate(${(1 - doc) * -10 - 3}deg)`}}>
            <CharterDoc w={460} write={1} seal={prog(t, 50.5, 51.1)} />
          </div>
          {['Équipes', 'Direction', "Conseil d'admin."].map((lv, i) => {
            const on = ladder > i / 3;
            return (
              <Enter key={lv} at={51.6 + i * 0.25} x={800} y={1380 - i * 230} from="right" dist={300}>
                <div style={{width: 380, padding: '20px 22px', borderRadius: 26, background: on ? (i === 2 ? colors.green : colors.navy) : '#fff', color: on ? '#fff' : colors.ink, fontFamily: sansFont, fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 12px 26px rgba(14,42,92,0.2)'}}>
                  <F n={['equipe', 'homme-bureau', 'juge'][i]} size={70} />
                  {lv}
                </div>
              </Enter>
            );
          })}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M1010 1400 V 880" stroke={colors.green} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ladder} />
            <path d="M985 905 L1010 870 L1035 905" stroke={colors.green} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={ladder > 0.95 ? 1 : 0} />
          </svg>
          <Enter at={54.6} x={800} y={700} bouncy>
            <Pill label="Approuvé tout en haut" icon="check" size={30} />
          </Enter>
        </div>
      )}

      {/* le but : normes, interne, externe */}
      {t >= 55.6 && t < 64.8 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 55.6, 64.8)}}>
          <Enter at={55.7} until={57.0} x={540} y={1000} bouncy><F n="cible" size={300} /></Enter>
          <Row at={57.6} y={620} icon="balance" label="Respecter des normes" sub="précises et reconnues" w={940} />
          <PhotoCard src="audit-reunion" at={60.6} x={300} y={1120} w={470} h={520} pos="40% 50%" label="Interne" icon="equipe" rotate={-2} from="left" />
          <PhotoCard src="mine-terrain" at={62.8} x={790} y={1150} w={470} h={520} pos="75% 40%" label="Clients" icon="poignee" rotate={2} from="right" />
          <Enter at={61.2} x={300} y={1440}><Pill label="Besoins internes" color={colors.navy} size={30} /></Enter>
          <Enter at={63.4} x={790} y={1470}><Pill label="Attentes externes" size={30} /></Enter>
        </div>
      )}

      {/* donne le ton */}
      {tone && (
        <>
          {[0, 1, 2].map((i) => {
            const p = ((t - 64.9) / 1.6 + i / 3) % 1;
            return <div key={i} style={{position: 'absolute', left: 540 - 260 - p * 280, top: 1060 - 260 - p * 280, width: 520 + p * 560, height: 520 + p * 560, borderRadius: '50%', border: `8px solid ${colors.green}`, opacity: (1 - p) * 0.5}} />;
          })}
          <Enter at={64.85} x={540} y={1060} bouncy>
            <CharterDoc w={420} write={1} seal={1} />
          </Enter>
          <Enter at={67.6} x={540} y={1480} bouncy>
            <Pill label="Toute la démarche qualité" icon="etoile" size={36} />
          </Enter>
        </>
      )}
    </div>
  );
};

/** 68,6 – 92,6 s : engagements forts ✔ / blabla commercial ✘. */
export const Distinction: React.FC = () => {
  const t = useT();
  const out = prog(t, 92.3, 92.6, easeIn);
  const bad = [
    {at: 79.5, label: 'Conditions générales de vente', icon: 'memo'},
    {at: 81.3, label: 'Blabla publicitaire', icon: 'megaphone'},
    {at: 84.1, label: 'Argumentaire commercial', icon: 'argent'},
  ];
  const conf = t >= 88.3;
  const split = t < 85.8;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="*Attention* : distinction clé" at={68.6} until={72.05} y={420} size={78} maxWidth={1000} accent={RED} />
      <Kinetic text="Des *engagements* forts" at={72.1} until={77.35} y={420} size={82} maxWidth={1000} />
      <Kinetic text="Ce qu'on *exclut*" at={77.4} until={85.75} y={420} size={92} accent={RED} />
      <Kinetic text="Une déclaration de *principe*" at={85.8} until={88.25} y={420} size={76} maxWidth={1000} />
      <Kinetic text="Bâtir la *confiance*" at={88.3} until={92.5} y={420} size={90} />

      <Enter at={68.7} until={72.0} x={540} y={1040} bouncy rotate={Math.sin(t * 8) * 4}>
        <F n="danger" size={320} />
      </Enter>

      {split && t >= 72.1 && (
        <>
          <Enter at={72.2} until={85.7} x={540} y={790} from="left" dist={-400}>
            <div style={{width: 940, borderRadius: 36, background: '#fff', padding: '26px 30px', boxShadow: '0 18px 36px rgba(46,155,62,0.22)', border: `6px solid ${colors.green}`, display: 'flex', alignItems: 'center', gap: 26}}>
              <Verdict ok size={130} />
              <div style={{fontFamily: sansFont}}>
                <div style={{fontWeight: 900, fontSize: 48, color: colors.navy}}>Engagements forts</div>
                <div style={{fontWeight: 700, fontSize: 34, color: colors.green, marginTop: 6, opacity: prog(t, 76.3, 76.7)}}>écrits avec des mots simples</div>
              </div>
              <div style={{marginLeft: 'auto'}}><F n="poignee" size={110} /></div>
            </div>
          </Enter>
          {bad.map((b, i) => (
            <Enter key={b.label} at={b.at} until={85.7} x={540} y={1080 + i * 170} from="right" dist={400}>
              <div style={{position: 'relative', width: 900, borderRadius: 28, background: '#FBE9E7', padding: '18px 26px', border: `5px solid ${RED}`, display: 'flex', alignItems: 'center', gap: 20}}>
                <F n={b.icon} size={86} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#7A2620'}}>{b.label}</div>
                <div style={{marginLeft: 'auto'}}><Verdict ok={false} size={84} /></div>
                <div style={{position: 'absolute', left: 120, right: 140, top: '50%'}}><Strike p={prog(t, b.at + 0.5, b.at + 0.9)} w={620} /></div>
              </div>
            </Enter>
          ))}
          <Enter at={84.6} until={85.7} x={540} y={1560} bouncy>
            <Pill label="Pas un argumentaire déguisé" color={RED} size={32} />
          </Enter>
        </>
      )}

      {t >= 85.8 && !conf && (
        <Enter at={85.85} until={88.25} x={540} y={1040} bouncy>
          <CharterDoc w={430} write={1} seal={prog(t, 86.6, 87.2)} title="PRINCIPES" />
        </Enter>
      )}
      {conf && (
        <>
          <Enter at={88.4} x={330} y={1000} bouncy>
            <div style={{width: 420, height: 460, borderRadius: 40, background: '#fff', border: `8px solid ${colors.green}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, boxShadow: '0 18px 36px rgba(46,155,62,0.25)'}}>
              <F n="poignee" size={190} float={6} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.green}}>CONFIANCE</div>
              <Verdict ok size={90} />
            </div>
          </Enter>
          <Enter at={90.6} x={770} y={1040} bouncy>
            <div style={{position: 'relative', width: 380, height: 400, borderRadius: 40, background: '#FBE9E7', border: `6px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: 0.92}}>
              <F n="argent" size={160} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED}}>TRANSACTION</div>
              <Verdict ok={false} size={80} />
            </div>
          </Enter>
          <Enter at={89.6} x={540} y={1430} bouncy>
            <Pill label="Un cadre de confiance" icon="bouclier" size={36} />
          </Enter>
        </>
      )}
    </div>
  );
};

/** 96,5 – 116,9 s : pourquoi s'imposer ces règles ? Le moteur stratégique. */
export const Pourquoi: React.FC = () => {
  const t = useT();
  const out = prog(t, 116.6, 116.9, easeIn);
  const pile = t >= 99.6 && t < 103.9;
  const top = t >= 106.0 && t < 111.2;
  const motor = t >= 111.2;
  const bars = [0.35, 0.5, 0.62, 0.8, 1];
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Libérer la *valeur*" at={96.5} until={99.55} y={420} size={92} />
      <Kinetic text="« Encore de la *paperasse* ! »" at={99.6} until={103.85} y={420} size={74} maxWidth={1000} accent={RED} />
      <Kinetic text="Pourquoi adopter une *charte* ?" at={103.9} until={105.95} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Les entreprises qui *cartonnent*" at={106.0} until={111.15} y={420} size={74} maxWidth={1000} />
      <Kinetic text="Le vrai *moteur* stratégique" at={111.2} until={116.8} y={420} size={78} maxWidth={1000} />

      {t < 99.6 && (
        <>
          <Enter at={96.6} until={99.5} x={540} y={1000} bouncy><F n="argent" size={260} float={8} /></Enter>
          {[0, 1, 2, 3, 4].map((i) => (
            <Enter key={i} at={97.5 + i * 0.12} until={99.5} x={540 + Math.cos(i * 1.3) * 340} y={1000 + Math.sin(i * 1.3) * 300} bouncy>
              <F n="etincelles" size={90} />
            </Enter>
          ))}
        </>
      )}
      {pile && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Enter key={i} at={100.9 + i * 0.12} until={103.85} x={540 + (i % 2 ? 18 : -18)} y={1300 - i * 70} from="up" dist={-500}>
              <div style={{width: 420, height: 64, borderRadius: 8, background: i % 2 ? '#FFFDF7' : '#F3EEDF', border: '3px solid #D6CDB5', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', transform: `rotate(${(i % 3) * 3 - 3}deg)`}} />
            </Enter>
          ))}
          <Enter at={101.4} until={103.85} x={830} y={820} bouncy><F n="haussement" size={210} float={6} /></Enter>
          <Enter at={102.5} until={103.85} x={230} y={800} bouncy>
            <div style={{fontFamily: handFont, fontSize: 70, color: colors.navy, background: '#fff', padding: '10px 26px', borderRadius: 24, boxShadow: '0 10px 20px rgba(0,0,0,0.12)'}}>Posons-nous…</div>
          </Enter>
        </>
      )}
      {t >= 103.9 && t < 106.0 && (
        <Enter at={103.95} until={105.95} x={540} y={1040} bouncy rotate={Math.sin(t * 4) * 8}>
          <F n="question" size={360} />
        </Enter>
      )}
      {top && (
        <>
          <div style={{position: 'absolute', left: 140, top: 760, width: 800, height: 660, display: 'flex', alignItems: 'flex-end', gap: 30}}>
            {bars.map((b, i) => {
              const p = prog(t, 106.2 + i * 0.18, 106.9 + i * 0.18, easeOut);
              return <div key={i} style={{flex: 1, height: 600 * b * p, borderRadius: '18px 18px 6px 6px', background: i === 4 ? colors.green : i % 2 ? colors.navy : '#3F6AA8', boxShadow: '0 10px 20px rgba(14,42,92,0.2)'}} />;
            })}
          </div>
          <Enter at={107.3} until={111.15} x={830} y={720} bouncy><F n="trophee" size={180} float={6} /></Enter>
          <Enter at={108.5} until={111.15} x={360} y={1520} bouncy>
            <Pill label="Elles s'imposent des règles" icon="clipboard" size={32} />
          </Enter>
          <Enter at={109.6} until={111.15} x={700} y={1580} bouncy>
            <Pill label="Niveau de service garanti" icon="medaille" size={32} />
          </Enter>
        </>
      )}
      {motor && (
        <>
          <Enter at={111.3} x={440} y={1000} bouncy><Gear size={420} speed={1.2} teeth={12} /></Enter>
          <Enter at={111.6} x={740} y={780} bouncy><Gear size={260} color={colors.green} speed={-1.9} teeth={9} /></Enter>
          <Enter at={111.9} x={760} y={1260} bouncy><Gear size={210} color={colors.ochre} speed={-2.3} teeth={8} /></Enter>
          <Enter at={113.9} x={540} y={1520} bouncy>
            <Pill label="La réponse ? Une idée brillante" icon="ampoule" size={34} />
          </Enter>
        </>
      )}
    </div>
  );
};

/** 116,9 – 138,4 s : pas un contrat, mais l'expression d'un contrat — une promesse publique. */
export const Promesse: React.FC = () => {
  const t = useT();
  const out = prog(t, 138.1, 138.4, easeIn);
  const strike = prog(t, 118.9, 119.5, easeOut);
  const quote = t < 123.6;
  const promise = t >= 123.6 && t < 129.0;
  const crowd = t >= 129.0;
  const lift = prog(t, 132.4, 133.4, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="L'*expression* d'un contrat" at={116.95} until={123.55} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Une *promesse* officielle" at={123.6} until={128.95} y={420} size={82} maxWidth={1000} />
      <Kinetic text="La *transparence* totale" at={129.0} until={134.35} y={420} size={82} maxWidth={1000} />
      <Kinetic text="Une *confiance* imbattable" at={134.4} until={138.3} y={420} size={82} maxWidth={1000} />

      {quote && (
        <>
          <Enter at={117.0} until={123.5} x={540} y={1010} bouncy>
            <div style={{position: 'relative', width: 940, borderRadius: 40, background: '#fff', padding: '60px 54px 50px', boxShadow: '0 22px 44px rgba(30,25,10,0.18)', borderTop: `14px solid ${colors.green}`}}>
              <div style={{position: 'absolute', left: 30, top: -70, fontFamily: 'Georgia, serif', fontSize: 220, color: colors.green, lineHeight: 1}}>“</div>
              <div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 800, fontSize: 56, color: '#8A94A3'}}>
                Pas un contrat juridique
                <Strike p={strike} w={700} />
              </div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: colors.navy, marginTop: 30, lineHeight: 1.08, opacity: prog(t, 119.6, 120.1), transform: `translateY(${(1 - prog(t, 119.6, 120.1)) * 30}px)`}}>
                mais l'<span style={{color: colors.green}}>expression</span> d'un contrat.
              </div>
            </div>
          </Enter>
          <Enter at={117.6} until={123.5} x={180} y={1420} bouncy><F n="balance" size={150} float={6} /></Enter>
          <Enter at={120.5} until={123.5} x={880} y={1420} bouncy><F n="poignee" size={170} float={6} /></Enter>
          <Enter at={121.7} until={123.5} x={540} y={1450} bouncy><Pill label="Un concept puissant" icon="eclair" size={34} /></Enter>
        </>
      )}
      {promise && (
        <>
          <Enter at={123.7} x={300} y={1000} from="left" dist={-400}><F n="megaphone" size={300} float={6} /></Enter>
          {[0, 1, 2].map((i) => {
            const p = ((t - 124) / 1.2 + i / 3) % 1;
            return <div key={i} style={{position: 'absolute', left: 470 + p * 200, top: 1000 - 60 - p * 120, width: 40 + p * 60, height: 120 + p * 240, borderRadius: '50%', borderRight: `10px solid ${colors.green}`, opacity: (1 - p) * fade(t, 123.7, 129)}} />;
          })}
          <Enter at={124.4} x={790} y={1000} bouncy>
            <CharterDoc w={330} write={1} seal={prog(t, 127.8, 128.3)} title="PROMESSE" lines={5} />
          </Enter>
          <Enter at={126.1} x={540} y={1500} bouncy><Pill label="Ce que l'entreprise s'engage à offrir" icon="etoile" size={30} /></Enter>
        </>
      )}
      {crowd && (
        <>
          {[0, 1, 2, 3, 4].map((i) => {
            const me = i === 2;
            const lx = 140 + i * 200;
            return (
              <div key={i} style={{position: 'absolute', left: lx, top: 1060 - (me ? lift * 170 : 0), transform: `translate(-50%, -50%) scale(${(me ? 1 + lift * 0.35 : 1) * prog(t, 129.2 + i * 0.1, 129.6 + i * 0.1)})`, filter: me ? `drop-shadow(0 0 ${lift * 30}px rgba(124,197,118,0.9))` : `grayscale(${lift})`, opacity: me ? 1 : 1 - lift * 0.5}}>
                <F n={me ? 'batiment' : 'usine'} size={170} />
              </div>
            );
          })}
          {t >= 129.7 && (
            <div style={{position: 'absolute', left: 540, top: 1060 - lift * 170, transform: 'translate(-50%, -50%)', width: 260, height: 260, borderRadius: '50%', border: `8px solid ${colors.green}`, opacity: prog(t, 129.8, 130.4) * 0.8}} />
          )}
          <Enter at={130.3} until={134.3} x={540} y={760} bouncy><F n="loupe" size={150} float={6} /></Enter>
          <Enter at={132.6} x={540} y={1330} bouncy><Pill label="Se démarquer des concurrents" icon="medaille" size={32} /></Enter>
          <Enter at={134.6} x={540} y={1490} bouncy><Pill label="Lien de confiance avec le public" icon="poignee" size={32} /></Enter>
          <Enter at={135.6} x={850} y={780} bouncy><F n="bouclier" size={170} float={6} /></Enter>
        </>
      )}
    </div>
  );
};

