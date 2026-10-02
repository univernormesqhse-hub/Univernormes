import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike, Verdict} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {ORANGE, Pic, Sigle} from './Scenes1';

const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** 150,6 – 168,9 s : EPI = on agit sur la personne ; EPC = on agit sur le danger. */
export const Cible: React.FC = () => {
  const t = useT();
  const out = prog(t, 168.6, 168.9, easeIn);
  const armor = prog(t, 158.2, 159.0, easeOut);
  const kill = prog(t, 162.8, 164.0, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Toute la *stratégie*" at={150.65} until={155.45} y={420} size={90} />
      <Kinetic text="*EPI* : sur la personne" at={155.5} until={159.45} y={420} size={80} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="*EPC* : sur le danger" at={159.5} until={165.35} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Pas la même *approche*" at={165.4} until={168.8} y={420} size={84} maxWidth={1000} />

      {t < 155.5 && (
        <Enter at={150.7} until={155.45} x={540} y={1000} bouncy><F n="boussole" size={320} float={8} /></Enter>
      )}
      {t >= 155.5 && (
        <>
          {/* moitié EPI */}
          <Enter at={155.55} x={540} y={760} from="left" dist={-600}>
            <div style={{width: 960, height: 400, borderRadius: 40, background: '#fff', borderLeft: `16px solid ${ORANGE}`, boxShadow: '0 16px 34px rgba(30,25,10,0.14)', display: 'flex', alignItems: 'center', padding: '0 36px', gap: 30}}>
              <div style={{position: 'relative', width: 280, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <F n="homme-bureau" size={230} />
                <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `10px solid ${ORANGE}`, transform: `scale(${armor})`, opacity: armor, boxShadow: '0 0 30px rgba(232,119,46,0.5)'}} />
              </div>
              <div style={{fontFamily: sansFont}}>
                <div style={{fontWeight: 900, fontSize: 64, color: ORANGE}}>EPI</div>
                <div style={{fontWeight: 800, fontSize: 40, color: colors.navy}}>Agit sur la personne</div>
                <div style={{fontFamily: handFont, fontSize: 48, color: '#5B6675', opacity: armor, marginTop: 8}}>→ une armure</div>
              </div>
            </div>
          </Enter>
          {/* moitié EPC */}
          {t >= 159.5 && (
            <Enter at={159.55} x={540} y={1250} from="right" dist={600}>
              <div style={{width: 960, height: 400, borderRadius: 40, background: '#fff', borderLeft: `16px solid ${colors.green}`, boxShadow: '0 16px 34px rgba(30,25,10,0.14)', display: 'flex', alignItems: 'center', padding: '0 36px', gap: 30}}>
                <div style={{position: 'relative', width: 280, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{transform: `scale(${1 - kill * 0.35})`, filter: `grayscale(${kill})`, opacity: 1 - kill * 0.5}}><F n="danger" size={230} /></div>
                  <div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={kill} w={240} /></div>
                </div>
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 900, fontSize: 64, color: colors.green}}>EPC</div>
                  <div style={{fontWeight: 800, fontSize: 40, color: colors.navy}}>Agit sur le danger</div>
                  <div style={{fontFamily: handFont, fontSize: 48, color: '#5B6675', opacity: kill, marginTop: 8}}>→ supprimé à la source</div>
                </div>
              </div>
            </Enter>
          )}
          <Enter at={165.5} x={540} y={1550} bouncy>
            <div style={{width: 120, height: 120, borderRadius: '50%', background: colors.navy, border: '8px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', boxShadow: '0 12px 24px rgba(0,0,0,0.2)'}}>≠</div>
          </Enter>
        </>
      )}
    </div>
  );
};

const ROWS = [
  {at: 170.2, k: 'Personnes protégées', epi: 'Une seule', epc: 'Plusieurs', win: 'epc'},
  {at: 173.8, k: 'Action requise', epi: 'Oui · à porter', epc: 'Non · passif', win: 'epc'},
  {at: 180.4, k: "Lieu d'action", epi: 'Sur la personne', epc: 'Sur la source', win: 'epc'},
  {at: 185.1, k: 'Coût', epi: 'Moins cher', epc: 'Rentable à terme', win: 'epc'},
  {at: 192.5, k: 'Priorité', epi: '2ᵉ recours', epc: '1ᵉʳ recours', win: 'epc'},
];

/** 168,9 – 195,4 s : le tableau comparatif, ligne par ligne. */
export const Tableau: React.FC = () => {
  const t = useT();
  const out = prog(t, 195.1, 195.4, easeIn);
  const head = useSpring(169.0, {damping: 14});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Le *face-à-face*" at={168.95} until={195.3} y={400} size={96} />
      <div style={{position: 'absolute', left: 40, top: 520, width: 1000, transform: `scale(${head})`, transformOrigin: 'top center'}}>
        <div style={{display: 'flex', gap: 12, marginBottom: 14}}>
          <div style={{flex: 1.15}} />
          <div style={{flex: 1, background: ORANGE, borderRadius: 22, padding: '14px 0', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'}}>EPI</div>
          <div style={{flex: 1, background: colors.green, borderRadius: 22, padding: '14px 0', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'}}>EPC</div>
        </div>
        {ROWS.map((r, i) => {
          const p = prog(t, r.at, r.at + 0.5, easeOut);
          const cur = ROWS.filter((x) => t >= x.at).length - 1 === i;
          const star = prog(t, r.at + 0.9, r.at + 1.3);
          return (
            <div key={r.k} style={{display: 'flex', gap: 12, marginBottom: 14, opacity: p, transform: `translateX(${(1 - p) * -80}px) scale(${cur ? 1.02 : 1})`}}>
              <div style={{flex: 1.15, background: cur ? colors.navy : '#fff', color: cur ? '#fff' : colors.navy, borderRadius: 22, padding: '22px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, boxShadow: '0 8px 18px rgba(30,25,10,0.1)', display: 'flex', alignItems: 'center'}}>{r.k}</div>
              <div style={{flex: 1, background: '#FFF4EC', borderRadius: 22, padding: '22px 16px', fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: '#8A4A1C', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{r.epi}</div>
              <div style={{position: 'relative', flex: 1, background: '#EAF6EC', borderRadius: 22, padding: '22px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#1F6B2B', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${star > 0.5 ? colors.green : 'transparent'}`}}>
                {r.epc}
                <div style={{position: 'absolute', right: -16, top: -16, transform: `scale(${star})`}}><Verdict ok size={48} /></div>
              </div>
            </div>
          );
        })}
      </div>
      <Enter at={176.1} until={180.3} x={300} y={1420} bouncy><Pill label="Penser à le mettre… et bien" icon="gilet" color={ORANGE} size={30} /></Enter>
      <Enter at={182.3} until={185.0} x={760} y={1420} bouncy><Pill label="Protège en permanence" icon="bouclier" size={30} /></Enter>
      <Enter at={189.0} until={192.4} x={760} y={1420} bouncy><Pill label="Plus rentable à long terme" icon="graphique" size={30} /></Enter>
      <Enter at={194.1} x={540} y={1440} bouncy><Pill label="C'est là que tout se joue" icon="eclair" size={34} /></Enter>
    </div>
  );
};

/** 201,3 – 226,8 s : la question de la hiérarchie et la réponse du droit du travail. */
export const RegleOr: React.FC = () => {
  const t = useT();
  const out = prog(t, 226.5, 226.8, easeIn);
  const ask = t < 214.3;
  const law = t >= 214.3 && t < 218.2;
  const order = t >= 218.2;
  const stamp = useSpring(222.7, {damping: 9});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="La question qui *tue*" at={201.35} until={204.0} y={420} size={92} accent={RED} />
      <Kinetic text="Par quoi *commencer* ?" at={204.05} until={210.85} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Claire, nette, *sans bavure*" at={210.9} until={214.25} y={420} size={74} maxWidth={1000} />
      <Kinetic text="Le *droit du travail*" at={214.3} until={218.15} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Le collectif *d'abord*" at={218.2} until={226.7} y={420} size={86} maxWidth={1000} />

      {ask && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 201.3, 214.3)}}>
          <Enter at={201.4} x={540} y={980} bouncy rotate={Math.sin(t * 3) * 5}><F n="question" size={260} float={6} /></Enter>
          <Enter at={205.4} x={260} y={1330} bouncy><Sigle k="EPI" w={300} sub={false} /></Enter>
          <Enter at={205.7} x={820} y={1330} bouncy><Sigle k="EPC" w={300} sub={false} /></Enter>
          <Enter at={206.6} x={540} y={720} bouncy><Pill label="Logiquement" icon="ampoule" size={32} /></Enter>
          <Enter at={207.8} x={540} y={1580} bouncy><Pill label="…et légalement" icon="balance" size={32} /></Enter>
          {t > 210.9 && (
            <div style={{position: 'absolute', left: 540, top: 980, transform: `translate(-50%, -50%) scale(${prog(t, 211.0, 211.4)})`}}>
              <Verdict ok size={200} />
            </div>
          )}
        </div>
      )}
      {law && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 214.3, 218.2)}}>
          <Enter at={214.4} x={540} y={980} bouncy><F n="juge" size={320} float={6} /></Enter>
          <Enter at={215.0} x={290} y={1360} bouncy><div style={{position: 'relative'}}><Pill label="Une opinion" color={RED} size={34} /><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 215.0, 215.4)} w={220} /></div></div></Enter>
          <Enter at={215.6} x={790} y={1360} bouncy><Pill label="Un principe" icon="livres" size={34} /></Enter>
        </div>
      )}
      {order && (
        <>
          <Enter at={218.3} x={540} y={820} from="up" dist={-400}><Sigle k="EPC" w={520} /></Enter>
          <Enter at={220.6} x={540} y={1240} from="down" dist={400}>
            <div style={{transform: 'scale(0.75)', opacity: 0.9}}><Sigle k="EPI" w={420} sub={false} /></div>
          </Enter>
          <Enter at={219.5} x={540} y={1060} bouncy>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: colors.navy, background: '#fff', padding: '8px 30px', borderRadius: 18, boxShadow: '0 8px 18px rgba(0,0,0,0.12)'}}>passe AVANT ↓</div>
          </Enter>
          {t > 222.7 && (
            <div style={{position: 'absolute', left: 780, top: 640, transform: `translate(-50%, -50%) rotate(-12deg) scale(${interpolate(stamp, [0, 1], [2.4, 1])})`, opacity: Math.min(1, stamp * 2), border: `10px solid ${RED}`, borderRadius: 20, padding: '8px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: RED, background: 'rgba(255,255,255,0.85)'}}>TOUJOURS</div>
          )}
          <Enter at={223.6} x={540} y={1530} bouncy><Pill label="La pierre angulaire de la prévention" icon="temple" size={30} /></Enter>
        </>
      )}
    </div>
  );
};

/** 226,8 – 242,5 s : plan A, B, C — la pyramide et le risque résiduel. */
export const Plans: React.FC = () => {
  const t = useT();
  const out = prog(t, 242.2, 242.5, easeIn);
  const plans = t < 233.3;
  const pyr = t >= 233.3;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="À *retenir* absolument" at={226.85} until={233.25} y={420} size={82} maxWidth={1000} />
      <Kinetic text="L'EPI : le *dernier recours*" at={233.3} until={238.75} y={420} size={74} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Couvrir le risque *résiduel*" at={238.8} until={242.4} y={420} size={74} maxWidth={1000} />

      {plans && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 226.8, 233.3)}}>
          {[
            {at: 230.6, k: 'A', who: 'EPC', c: colors.green, ok: true},
            {at: 231.2, k: 'B', who: 'EPI', c: ORANGE, ok: false},
            {at: 232.6, k: 'C', who: 'EPI', c: ORANGE, ok: false},
          ].map((p, i) => (
            <Enter key={p.k} at={p.at} x={540} y={720 + i * 300} from="left" dist={-400}>
              <div style={{width: 900, height: 250, borderRadius: 36, background: '#fff', borderLeft: `16px solid ${p.c}`, boxShadow: '0 14px 30px rgba(30,25,10,0.14)', display: 'flex', alignItems: 'center', padding: '0 36px', gap: 30, opacity: i === 0 ? 1 : 0.85}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: p.c, width: 150}}>{p.k}</div>
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 800, fontSize: 34, color: '#5B6675'}}>PLAN {p.k}</div>
                  <div style={{fontWeight: 900, fontSize: 60, color: colors.navy}}>{p.who}</div>
                </div>
                <div style={{marginLeft: 'auto'}}>{i === 0 ? <Verdict ok size={110} /> : <F n="sablier" size={100} />}</div>
              </div>
            </Enter>
          ))}
          <Enter at={229.3} until={230.5} x={540} y={1000} bouncy><F n="memo" size={260} /></Enter>
        </div>
      )}
      {pyr && (
        <>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {[
              {y0: 1420, y1: 1080, w0: 860, w1: 600, c: colors.green, at: 233.4, l1: 'COLLECTIVE (EPC)', l2: 'PRIORITÉ'},
              {y0: 1060, y1: 800, w0: 580, w1: 380, c: ORANGE, at: 234.0, l1: 'INDIVIDUELLE (EPI)', l2: 'COMPLÉMENT'},
              {y0: 780, y1: 600, w0: 360, w1: 0, c: colors.navy, at: 239.6, l1: '', l2: ''},
            ].map((b, i) => {
              const p = prog(t, b.at, b.at + 0.6, easeOut);
              const dy = (1 - p) * -300;
              return (
                <g key={i} opacity={p} transform={`translate(0 ${dy})`}>
                  <polygon points={`${540 - b.w0 / 2},${b.y0} ${540 + b.w0 / 2},${b.y0} ${540 + b.w1 / 2},${b.y1} ${540 - b.w1 / 2},${b.y1}`} fill={b.c} stroke="#F1EDE3" strokeWidth={6} />
                  <text x={540} y={(b.y0 + b.y1) / 2 - (b.l1 ? 8 : -30)} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={i === 0 ? 42 : 34} fill="#fff">{b.l1}</text>
                  <text x={540} y={(b.y0 + b.y1) / 2 + (b.l1 ? 44 : 40)} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={i === 2 ? 26 : 34} fill="#fff" opacity={0.92}>{b.l2}</text>
                </g>
              );
            })}
          </svg>
          <Enter at={234.9} until={238.7} x={540} y={1560} bouncy><Pill label="Si l'EPC est impossible" icon="stop" color={colors.ochre} size={32} /></Enter>
          <Enter at={238.9} x={540} y={1560} bouncy><Pill label="En plus de l'EPC" icon="maillon" size={32} /></Enter>
          <Enter at={239.8} x={830} y={640} bouncy><Pill label="Risque résiduel" icon="danger" color={colors.navy} size={30} /></Enter>
          <Enter at={233.6} x={130} y={1280} bouncy><Pic src="ic-garde-corps.png" w={150} /></Enter>
          <Enter at={234.2} x={950} y={930} bouncy><F n="gants" size={130} /></Enter>
        </>
      )}
    </div>
  );
};

/** 242,5 – 265,4 s : réflexion — responsabilité individuelle ou collective ? */
export const Reflexion: React.FC = () => {
  const t = useT();
  const out = prog(t, 265.1, 265.4, easeIn);
  const tilt = interpolate(prog(t, 254.8, 257.5, easeInOut), [0, 1], [-12, 12]);
  const final = t >= 261.2;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Une réflexion plus *profonde*" at={242.55} until={248.15} y={420} size={74} maxWidth={1000} />
      <Kinetic text="*Chacun* son casque ?" at={248.2} until={254.75} y={420} size={78} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Ou un environnement *sûr* ?" at={254.8} until={261.15} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Priorité à l'*EPC*" at={261.2} until={265.3} y={420} size={96} />

      {t < 248.2 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 242.5, 248.2)}}>
          <Enter at={242.6} x={290} y={1000} from="left" dist={-400}><Sigle k="EPI" w={400} /></Enter>
          <Enter at={243.0} x={790} y={1000} from="right" dist={400}><Sigle k="EPC" w={400} /></Enter>
          <Enter at={246.4} x={540} y={1400} bouncy><F n="pensif" size={200} float={6} /></Enter>
        </div>
      )}
      {t >= 248.2 && !final && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 248.2, 261.2)}}>
          <Enter at={248.3} x={540} y={1080} bouncy>
            <svg width={940} height={720} viewBox="0 0 940 720" overflow="visible">
              <rect x={455} y={240} width={30} height={420} rx={10} fill={colors.ink} />
              <rect x={330} y={650} width={280} height={34} rx={14} fill={colors.ink} />
              <g transform={`rotate(${tilt} 470 250)`}>
                <rect x={60} y={236} width={820} height={28} rx={14} fill={colors.navy} />
                <path d="M150 264 L80 470 H260 Z" fill="none" stroke={colors.navy} strokeWidth={6} transform="translate(-20 0)" />
                <path d="M790 264 L720 470 H900 Z" fill="none" stroke={colors.navy} strokeWidth={6} transform="translate(-20 0)" />
                <ellipse cx={150} cy={470} rx={120} ry={22} fill={ORANGE} />
                <ellipse cx={790} cy={470} rx={120} ry={22} fill={colors.green} />
              </g>
            </svg>
          </Enter>
          {[
            {px: 130, at: 249.6, n: 'casque', l: 'Individuelle', c: ORANGE},
            {px: 770, at: 255.4, n: 'equipe', l: 'Collective', c: colors.green},
          ].map((pan) => {
            const a = (tilt * Math.PI) / 180;
            const dx = pan.px - 470;
            const dy = 470 - 250;
            const x = 70 + 470 + dx * Math.cos(a) - dy * Math.sin(a);
            const y = 720 + 250 + dx * Math.sin(a) + dy * Math.cos(a);
            return (
              <div key={pan.l} style={{position: 'absolute', left: x, top: y - 150, transform: 'translate(-50%, -50%)'}}>
                <Enter at={pan.at} x={0} y={0} bouncy>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <F n={pan.n} size={170} />
                    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: pan.c, whiteSpace: 'nowrap'}}>{pan.l}</div>
                  </div>
                </Enter>
              </div>
            );
          })}
          <Enter at={252.9} until={254.7} x={540} y={1560} bouncy><Pill label="« Et tout ira bien » ?" icon="haussement" color={ORANGE} size={32} /></Enter>
          <Enter at={257.3} x={540} y={1560} bouncy><Pill label="Sûr à la base, pour tout le monde" icon="usine" size={32} /></Enter>
        </div>
      )}
      {final && (
        <>
          <PhotoCard src="epi/chantier.jpg" at={261.25} x={540} y={940} w={940} h={640} pos="50% 50%" label="Sécuriser l'environnement" icon="chantier" />
          <Enter at={262.6} x={540} y={1420} bouncy><Sigle k="EPC" w={300} sub={false} /></Enter>
          <Enter at={263.8} x={820} y={1380} bouncy><F n="ampoule" size={150} float={6} /></Enter>
        </>
      )}
    </div>
  );
};
