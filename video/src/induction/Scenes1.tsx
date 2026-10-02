import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {PhotoCard, RED, Verdict} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

export const BLUE = '#2F6FE4';
export const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** Carte-icône carrée avec légende. */
export const IconCard: React.FC<{n: string; label: string; sub?: string; color?: string; w?: number}> = ({n, label, sub, color = colors.green, w = 300}) => (
  <div style={{width: w, padding: '22px 12px', borderRadius: 34, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 14px 30px rgba(30,25,10,0.16)', borderBottom: `10px solid ${color}`}}>
    <F n={n} size={w * 0.45} />
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.12, color: colors.navy, textAlign: 'center', lineHeight: 1.05}}>{label}</div>
    {sub && <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: w * 0.085, color: '#5B6675', textAlign: 'center'}}>{sub}</div>}
  </div>
);

/** 0 – 30,3 s : accroche — avant le premier pas sur le site, une étape obligatoire. */
export const Intro: React.FC = () => {
  const t = useT();
  const out = prog(t, 30.0, 30.3, easeIn);
  const walk = interpolate(prog(t, 12.6, 15.2, easeInOut), [0, 1], [-200, 380]);
  const stop = prog(t, 21.2, 21.8, easeOut);
  const gate = useSpring(21.3, {damping: 10});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="L'induction *HSE*" at={0.1} until={4.65} y={420} size={104} />
      <Kinetic text="Bien plus qu'une *formalité*" at={4.7} until={10.75} y={420} size={74} maxWidth={1000} />
      <Kinetic text="Imaginez la *scène*" at={10.8} until={17.65} y={420} size={90} />
      <Kinetic text="Avant le *premier pas*…" at={17.7} until={21.15} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Une étape *obligatoire*" at={21.2} until={25.65} y={420} size={82} maxWidth={1000} accent={RED} />
      <Kinetic text="Mais *laquelle* ?" at={25.7} until={30.2} y={420} size={100} />

      {t < 10.8 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 0, 10.8)}}>
          <PhotoCard src="induction/accueil-groupe.jpg" at={0.2} x={540} y={960} w={940} h={720} pos="50% 50%" label="Séance d'accueil" icon="equipe" />
          <div style={{position: 'absolute', left: 0, right: 0, top: 1400, display: 'flex', justifyContent: 'center', gap: 18}}>
            {['Santé', 'Sécurité', 'Environnement'].map((w, i) => (
              <div key={w} style={{opacity: prog(t, 1.1 + i * 0.7, 1.5 + i * 0.7), transform: `translateY(${(1 - prog(t, 1.1 + i * 0.7, 1.5 + i * 0.7)) * 40}px)`, background: [BLUE, colors.navy, colors.green][i], color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '12px 26px', borderRadius: 18, boxShadow: '0 10px 22px rgba(0,0,0,0.18)'}}>
                {w}
              </div>
            ))}
          </div>
          <Enter at={7.3} x={540} y={1560} bouncy><Pill label="La première pierre de la sécurité" icon="brique" size={34} /></Enter>
        </div>
      )}
      {t >= 10.8 && t < 21.2 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 10.8, 21.2)}}>
          <PhotoCard src="induction/marquage.jpg" at={10.9} x={540} y={900} w={940} h={780} pos="50% 60%" label="Le site" icon="usine" />
          <div style={{position: 'absolute', left: walk, top: 1400, transform: 'translate(-50%, -50%)'}}>
            <F n="ouvrier" size={240} />
          </div>
          <Enter at={15.5} x={780} y={1440} bouncy><F n="outils" size={150} float={6} /></Enter>
          <Enter at={16.4} x={940} y={1300} bouncy><F n="equipe" size={130} float={6} /></Enter>
          <Enter at={18.4} x={380} y={1240} bouncy><F n="pas" size={110} /></Enter>
        </div>
      )}
      {t >= 21.2 && t < 25.7 && (
        <>
          <div style={{position: 'absolute', left: 540, top: 1000, transform: `translate(-50%, -50%) scale(${gate})`}}>
            <div style={{width: 520, height: 560, borderRadius: 40, background: '#fff', border: `12px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: '0 20px 44px rgba(217,68,58,0.3)'}}>
              <F n="sens-interdit" size={240} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: RED, textAlign: 'center', lineHeight: 1.05}}>STOP<br />avant d'entrer</div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 220 - stop * 40, top: 1500, transform: 'translate(-50%, -50%)'}}><F n="ouvrier" size={190} /></div>
          <Enter at={23.0} x={760} y={1500} bouncy><Pill label="Impératif" icon="danger" color={RED} size={38} /></Enter>
        </>
      )}
      {t >= 25.7 && (
        <>
          <Enter at={25.75} x={540} y={980} bouncy rotate={Math.sin(t * 4) * 6}><F n="question" size={320} /></Enter>
          <Enter at={27.6} x={540} y={1400} bouncy><Pill label="On entre dans le vif du sujet" icon="loupe" size={34} /></Enter>
        </>
      )}
    </div>
  );
};

/** 36,9 – 75,7 s : définition, prévention, et pour qui (tout le monde). */
export const Definition: React.FC = () => {
  const t = useT();
  const out = prog(t, 75.4, 75.7, easeIn);
  const def = t < 49.3;
  const prev = t >= 49.3 && t < 58.2;
  const who = t >= 58.2 && t < 72.5;
  const all = t >= 72.5;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="C'est quoi *concrètement* ?" at={36.95} until={41.05} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Une formation *initiale*" at={41.1} until={44.95} y={420} size={82} maxWidth={1000} />
      <Kinetic text="Les *règles du jeu*" at={45.0} until={49.25} y={420} size={92} />
      <Kinetic text="Le mot-clé : *prévention*" at={49.3} until={58.15} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Pour *qui* ?" at={58.2} until={61.65} y={420} size={110} />
      <Kinetic text="*Tout* le monde" at={61.7} until={72.45} y={420} size={104} />
      <Kinetic text="L'affaire de *tous*" at={72.5} until={75.6} y={420} size={96} />

      {def && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 36.9, 49.3)}}>
          <Enter at={37.0} until={41.0} x={540} y={1000} bouncy><F n="loupe" size={300} float={8} /></Enter>
          {t >= 41.1 && (
            <>
              <Enter at={41.15} x={540} y={900} bouncy>
                <div style={{width: 900, borderRadius: 40, background: BLUE, padding: '40px 46px', boxShadow: '0 22px 44px rgba(47,111,228,0.35)', color: '#fff', fontFamily: sansFont}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                    <F n="diplome" size={120} />
                    <div style={{fontWeight: 900, fontSize: 70}}>Induction HSE</div>
                  </div>
                  <div style={{fontWeight: 600, fontSize: 38, marginTop: 20, lineHeight: 1.3, opacity: prog(t, 42.0, 42.5)}}>Formation initiale qui présente les règles HSE pour prévenir les accidents et les impacts environnementaux.</div>
                </div>
              </Enter>
              <Enter at={45.2} x={290} y={1360} bouncy><IconCard n="clipboard" label="Règles" w={260} color={BLUE} /></Enter>
              <Enter at={46.7} x={790} y={1360} bouncy><IconCard n="bouclier" label="Sécurité" w={260} /></Enter>
            </>
          )}
        </div>
      )}
      {prev && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 49.3, 58.2)}}>
          <Enter at={49.4} x={540} y={820} bouncy>
            <div style={{width: 360, height: 360, borderRadius: '50%', background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 22px rgba(46,155,62,0.18), 0 20px 40px rgba(46,155,62,0.35)'}}>
              <F n="bouclier" size={210} />
            </div>
          </Enter>
          {[
            {at: 51.8, n: 'danger', l: 'Accidents', x: 200},
            {at: 53.4, n: 'chaine-cassee', l: 'Incidents', x: 540},
            {at: 56.0, n: 'feuille', l: 'Environnement', x: 880},
          ].map((it) => (
            <Enter key={it.l} at={it.at} x={it.x} y={1320} bouncy>
              <div style={{position: 'relative'}}>
                <IconCard n={it.n} label={it.l} w={300} color={it.l === 'Environnement' ? colors.green : RED} />
              </div>
            </Enter>
          ))}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {[200, 540, 880].map((x, i) => (
              <path key={x} d={`M540 1000 L${x} 1150`} stroke={colors.green} strokeWidth={8} strokeDasharray="12 12" opacity={prog(t, [51.8, 53.4, 56.0][i], [51.8, 53.4, 56.0][i] + 0.3)} />
            ))}
          </svg>
        </div>
      )}
      {who && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 58.2, 72.5)}}>
          {t < 63.8 && (
            <>
              <Enter at={58.3} x={540} y={1000} bouncy rotate={Math.sin(t * 3) * 5}><F n="question" size={260} /></Enter>
              <Enter at={61.8} x={540} y={1400} bouncy><Pill label="Toute personne qui entre sur le site" icon="pas" size={32} /></Enter>
            </>
          )}
          {[
            {at: 63.9, n: 'ouvrier', l: 'Nouvel employé', s: 'plusieurs années', x: 290, y: 860},
            {at: 66.5, n: 'outils', l: 'Sous-traitant', s: 'quelques jours', x: 790, y: 860},
            {at: 69.1, n: 'badge', l: 'Visiteur', s: 'quelques heures', x: 290, y: 1340},
            {at: 70.1, n: 'diplome', l: 'Stagiaire', s: 'en formation', x: 790, y: 1340},
          ].map((p) => (
            <Enter key={p.l} at={p.at} x={p.x} y={p.y} bouncy>
              <IconCard n={p.n} label={p.l} sub={p.s} w={420} color={BLUE} />
            </Enter>
          ))}
          <Enter at={71.5} x={540} y={1600} bouncy><Pill label="Personne n'y coupe" icon="check" size={36} /></Enter>
        </div>
      )}
      {all && (
        <>
          <PhotoCard src="induction/accueil-groupe.jpg" at={72.55} x={540} y={940} w={940} h={720} pos="50% 50%" label="Tous concernés" icon="equipe" />
          <Enter at={74.2} x={540} y={1420} bouncy><Pill label="La sécurité, l'affaire de tous" icon="poignee" size={38} /></Enter>
        </>
      )}
    </div>
  );
};

const STEPS = [
  {at: 91.6, n: 'danger', l: 'Informer', s: 'les risques du site'},
  {at: 94.0, n: 'livres', l: 'Expliquer', s: 'les règles HSE'},
  {at: 97.2, n: 'casque', l: 'Présenter', s: 'les équipements'},
  {at: 98.3, n: 'gyrophare', l: 'Décrire', s: "les conduites d'urgence"},
  {at: 103.7, n: 'main-levee', l: 'Responsabiliser', s: 'chaque personne'},
];

/** 82,9 – 109 s : les cinq objectifs, de l'information à l'action. */
export const Objectifs: React.FC = () => {
  const t = useT();
  const out = prog(t, 108.7, 109.0, easeIn);
  const mirror = t >= 105.2;
  const cur = STEPS.filter((s) => t >= s.at).length - 1;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="*Cinq* objectifs précis" at={82.95} until={88.55} y={420} size={84} maxWidth={1000} />
      <Kinetic text="De l'info à l'*action*" at={88.6} until={105.15} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Chacun *acteur* de sa sécurité" at={105.2} until={108.9} y={420} size={70} maxWidth={1000} />

      {t < 91.6 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 82.9, 91.6)}}>
          <Enter at={83.0} x={540} y={980} bouncy>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 480, color: BLUE, lineHeight: 1, textShadow: '0 20px 40px rgba(47,111,228,0.25)'}}>5</div>
          </Enter>
          <Enter at={86.3} x={300} y={1420} bouncy><Pill label="Information" icon="memo" color={BLUE} size={34} /></Enter>
          <Enter at={87.5} x={790} y={1420} bouncy><Pill label="Action" icon="eclair" size={34} /></Enter>
          {t > 87.5 && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d="M500 1420 L620 1420" stroke={colors.green} strokeWidth={8} markerEnd="" /></svg>}
        </div>
      )}
      {t >= 91.6 && !mirror && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 91.6, 105.2)}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M110 640 V 1560" stroke={colors.green} strokeWidth={8} strokeDasharray="14 12" opacity={0.5} />
          </svg>
          {STEPS.map((st, i) => (
            <Enter key={st.l} at={st.at} x={580} y={650 + i * 225} from="left" dist={-300}>
              <div style={{width: 900, display: 'flex', alignItems: 'center', gap: 22, background: i === cur ? colors.navy : '#fff', borderRadius: 30, padding: '16px 24px', boxShadow: '0 14px 30px rgba(30,25,10,0.15)', borderLeft: `14px solid ${i === 4 ? colors.green : BLUE}`}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 62, color: i === cur ? colors.greenLight : BLUE, width: 54, textAlign: 'center'}}>{i + 1}</div>
                <F n={st.n} size={92} />
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 900, fontSize: 46, color: i === cur ? '#fff' : colors.navy}}>{st.l}</div>
                  <div style={{fontWeight: 600, fontSize: 30, color: i === cur ? '#C9D6EA' : '#5B6675'}}>{st.s}</div>
                </div>
              </div>
            </Enter>
          ))}
        </div>
      )}
      {mirror && (
        <>
          <PhotoCard src="induction/miroir.jpg" at={105.25} x={540} y={960} w={860} h={860} pos="50% 50%" label="Votre sécurité commence par vous" icon="yeux" />
          <Enter at={107.9} x={540} y={1480} bouncy><Pill label="…et celle des autres" icon="equipe" size={36} /></Enter>
        </>
      )}
    </div>
  );
};

/** 115,6 – 163,1 s : le contenu — fondamentaux, pratique, environnement. */
export const Contenu: React.FC = () => {
  const t = useT();
  const out = prog(t, 162.8, 163.1, easeIn);
  const fond = t < 133.2;
  const prat = t >= 133.2 && t < 149.0;
  const env = t >= 149.0;
  const ring = prog(t, 159.9, 161.4, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="D'abord les *fondamentaux*" at={115.65} until={128.65} y={420} size={74} maxWidth={1000} />
      <Kinetic text="Se repérer : la *signalisation*" at={128.7} until={133.15} y={420} size={68} maxWidth={1000} />
      <Kinetic text="Du très *pratique*" at={133.2} until={142.75} y={420} size={92} />
      <Kinetic text="Signaler chaque *incident*" at={142.8} until={148.95} y={420} size={78} maxWidth={1000} accent={RED} />
      <Kinetic text="Le E de *HSE*" at={149.0} until={159.75} y={420} size={100} />
      <Kinetic text="Une vision à *360°*" at={159.8} until={163.0} y={420} size={92} />

      {fond && t < 128.7 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 115.6, 128.7)}}>
          {[
            {at: 118.5, n: 'memo', l: 'Politique HSE', s: "vision d'ensemble", y: 700},
            {at: 124.3, n: 'danger', l: 'Risques du site', s: 'spécifiques', y: 960},
            {at: 126.4, n: 'clipboard', l: 'Règles de base', s: 'à respecter tout le temps', y: 1220},
          ].map((r) => (
            <Enter key={r.l} at={r.at} x={540} y={r.y} from="left" dist={-300}>
              <div style={{width: 920, display: 'flex', alignItems: 'center', gap: 24, background: '#fff', borderRadius: 30, padding: '20px 26px', boxShadow: '0 14px 30px rgba(30,25,10,0.15)', borderLeft: `14px solid ${BLUE}`}}>
                <F n={r.n} size={100} />
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 900, fontSize: 48, color: colors.navy}}>{r.l}</div>
                  <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675'}}>{r.s}</div>
                </div>
              </div>
            </Enter>
          ))}
          <Enter at={115.7} until={118.4} x={540} y={1000} bouncy><F n="livres" size={300} float={8} /></Enter>
          {t > 122.6 && (
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M150 790 V 870" stroke={BLUE} strokeWidth={8} markerEnd="" opacity={prog(t, 122.6, 123.0)} />
            </svg>
          )}
          <Enter at={122.7} x={820} y={1450} bouncy><Pill label="Zoom sur le terrain" icon="loupe" size={32} /></Enter>
        </div>
      )}
      {fond && t >= 128.7 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 128.7, 133.2)}}>
          <PhotoCard src="induction/marquage.jpg" at={128.75} x={540} y={940} w={940} h={760} pos="50% 55%" label="Marquage & circulation" icon="carte" />
          <Enter at={131.4} x={540} y={1440} bouncy><Pill label="Zones à accès restreint" icon="sens-interdit" color={RED} size={34} /></Enter>
        </div>
      )}
      {prat && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 133.2, 149.0)}}>
          {[
            {at: 135.4, n: 'casque', l: 'Les EPI', s: 'bien les utiliser', x: 290, y: 820},
            {at: 140.1, n: 'gyrophare', l: 'Alarme', s: 'que faire ?', x: 790, y: 820},
            {at: 141.6, n: 'porte', l: 'Évacuation', s: 'sortir du site', x: 290, y: 1290},
            {at: 143.8, n: 'megaphone', l: 'Incident', s: 'même anodin', x: 790, y: 1290},
          ].map((c, i) => (
            <Enter key={c.l} at={c.at} x={c.x} y={c.y} bouncy>
              <IconCard n={c.n} label={c.l} sub={c.s} w={420} color={i === 3 ? RED : BLUE} />
            </Enter>
          ))}
          <Enter at={138.6} x={290} y={1060} bouncy>
            <div style={{display: 'flex', gap: 6}}>{['gants', 'lunettes', 'chaussure'].map((n) => <F key={n} n={n} size={70} />)}</div>
          </Enter>
          <Enter at={146.8} x={540} y={1600} bouncy><Pill label="Pour éviter pire demain" icon="chaine-cassee" color={RED} size={32} /></Enter>
        </div>
      )}
      {env && (
        <>
          {t < 159.8 ? (
            <>
              <Enter at={149.1} x={540} y={820} bouncy>
                <div style={{width: 320, height: 320, borderRadius: '50%', background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: '#fff', boxShadow: '0 0 0 20px rgba(46,155,62,0.18), 0 20px 40px rgba(46,155,62,0.35)'}}>E</div>
              </Enter>
              <Enter at={154.2} x={290} y={1300} bouncy><IconCard n="recyclage" label="Tri des déchets" w={400} /></Enter>
              <Enter at={155.8} x={500} y={1470} bouncy><F n="poubelle" size={110} /></Enter>
              <Enter at={156.9} x={790} y={1300} bouncy><IconCard n="feuille" label="Protéger l'environnement" w={400} /></Enter>
            </>
          ) : (
            <>
              <Enter at={159.85} x={540} y={1020} bouncy><F n="planete" size={300} /></Enter>
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                <circle cx={540} cy={1020} r={300} fill="none" stroke={colors.green} strokeWidth={18} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} transform="rotate(-90 540 1020)" />
              </svg>
              {['Santé', 'Sécurité', 'Environnement'].map((w, i) => {
                const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
                return (
                  <Enter key={w} at={160.3 + i * 0.3} x={540 + 330 * Math.cos(a)} y={1020 + 330 * Math.sin(a)} bouncy>
                    <div style={{background: [BLUE, colors.navy, colors.green][i], color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, padding: '10px 22px', borderRadius: 16, whiteSpace: 'nowrap'}}>{w}</div>
                  </Enter>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

