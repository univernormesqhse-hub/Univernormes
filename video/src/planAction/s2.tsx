import React from 'react';
import {AbsoluteFill} from 'remotion';
import {F} from '../iso/ui';
import {sansFont} from '../theme';
import {Abs, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, Mark, Photo, PlanSheet, pop, prog, RED, Row, Sc, spring, T, TEAL, Title, useT, VIO, YEL} from './kit';

/* ─────────── ÉTAPE 5 : les ressources ─────────── */
/** Les ressources tombent dans la caisse ; le plan se déplie alors en carte pop-up au lieu de rester à plat. */
const Crate: React.FC = () => {
  const t = useT();
  const R = [{at: 120.7, l: 'Budget', ic: 'argent'}, {at: 122.2, l: 'Matériel', ic: 'outils'}, {at: 123.1, l: 'Personnel', ic: 'equipe'}, {at: 124.1, l: 'Formation', ic: 'ecole'}, {at: 125.3, l: 'Intervention technique', ic: 'tournevis'}];
  return (
    <AbsoluteFill>
      <Title>De quoi as-tu <Mark c={TEAL} p={prog(t, 119.6, 120.4)}>besoin</Mark> ?</Title>
      {R.map((r, i) => {
        const d = prog(t, r.at - 0.2, r.at + 0.5, easeIn);
        const x = 130 + i * 175;
        return (
          <Abs key={i} x={x} y={lerp(420, 900, d)} w={160} style={{textAlign: 'center', opacity: pop(t, r.at - 0.3)}}>
            <F n={r.ic} size={120} />
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: INK, marginTop: 4, opacity: 1 - d * 0.2}}>{r.l}</div>
          </Abs>
        );
      })}
      <Abs x={110} y={1000} w={860} h={300} style={{background: '#B58A5A', borderRadius: 18, border: `6px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 140px, rgba(0,0,0,0.15) 140px 146px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={46} color="#fff">RESSOURCES</T></Abs>
    </AbsoluteFill>
  );
};
const PopUp: React.FC = () => {
  const t = useT();
  const up = prog(t, 128.6, 129.8, easeOut);
  return (
    <AbsoluteFill>
      <Title>Pas seulement <Mark c={RED} p={prog(t, 129.6, 130.3)}>sur le papier</Mark></Title>
      <Abs x={140} y={1050} w={800} h={300} style={{background: '#fff', borderRadius: 16, border: `5px solid ${INK}`, transform: 'perspective(1200px) rotateX(55deg)', boxShadow: '0 30px 40px rgba(0,0,0,0.2)'}} />
      <Abs x={240} y={520} w={600} h={620} style={{transformOrigin: '50% 100%', transform: `perspective(1400px) rotateX(${(1 - up) * 85}deg)`}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 20, background: TEAL, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, boxShadow: '0 30px 50px rgba(20,33,61,0.3)'}}>
          <F n="chantier" size={200} /><T size={50} color="#fff">Le plan prend vie</T>
        </div>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── ÉTAPE 6 : suivre l'avancement ─────────── */
const Kanban: React.FC = () => {
  const t = useT();
  const C = [{at: 136.9, l: 'RÉALISÉES', c: GREEN}, {at: 138.0, l: 'EN COURS', c: YEL}, {at: 139.0, l: 'EN RETARD', c: RED}];
  return (
    <AbsoluteFill>
      <Title>Un <Mark c={BLUE} p={prog(t, 134.6, 135.4)}>tableau de suivi</Mark></Title>
      {C.map((c, i) => (
        <Abs key={c.l} x={60 + i * 330} y={460} w={300} h={720} style={{background: `${c.c}1F`, borderRadius: 24, border: `4px solid ${c.c}`, opacity: pop(t, 134.6 + i * 0.15)}}>
          <div style={{padding: '18px 0', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{c.l}</div>
          {[0, 1, 2].map((k) => {
            const at = c.at + k * 0.2;
            const d = prog(t, at - 0.4, at, easeOut);
            return <div key={k} style={{position: 'absolute', left: 24, top: lerp(-300, 110 + k * 190, d), width: 252, height: 160, borderRadius: 16, background: '#fff', border: `4px solid ${c.c}`, opacity: d, boxShadow: '0 8px 18px rgba(0,0,0,0.1)', padding: 16, boxSizing: 'border-box'}}>
              <div style={{height: 14, width: '80%', borderRadius: 7, background: '#D5DBE6'}} /><div style={{height: 14, width: '55%', borderRadius: 7, background: '#D5DBE6', marginTop: 12}} />
              <div style={{position: 'absolute', right: 14, bottom: 10, fontSize: 40, fontWeight: 900, color: c.c}}>{i === 0 ? '✓' : i === 1 ? '…' : '!'}</div>
            </div>;
          })}
        </Abs>
      ))}
    </AbsoluteFill>
  );
};
const Meeting: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>Des <Mark c={BLUE} p={prog(t, 141.8, 142.6)}>points de suivi</Mark> réguliers</Title>
      <Photo src="promo/audit-reunion.jpg" x={60} y={450} w={960} h={560} pos="50% 45%" />
      <Abs x={160} y={1050} w={760} h={300} style={{background: '#fff', borderRadius: 20, border: `5px solid ${INK}`, padding: 20, boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: 10}}>
        {Array.from({length: 14}, (_, i) => <div key={i} style={{width: 92, height: 110, borderRadius: 12, background: i % 7 === 1 && t > 141.0 + i * 0.1 ? BLUE : '#F1F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 40}}>{i % 7 === 1 && t > 141.0 + i * 0.1 ? '👥' : ''}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── ÉTAPE 7 : vérifier l'efficacité ─────────── */
const NotEqual: React.FC = () => {
  const t = useT();
  const neq = spring(t, 150.9, 6, 12);
  return (
    <AbsoluteFill>
      <Abs x={60} y={560} w={420} h={420} style={{background: '#fff', borderRadius: 30, border: `6px solid ${BLUE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 148.8)}}><F n="check" size={160} /><T size={44}>Réalisée</T></Abs>
      <Abs x={600} y={560} w={420} h={420} style={{background: '#fff', borderRadius: 30, border: `6px solid ${VIO}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 150.6)}}><F n="cible" size={160} /><T size={44}>Efficace</T></Abs>
      <Abs x={470} y={680} w={140} style={{textAlign: 'center', transform: `scale(${neq})`}}><T size={160} color={RED}>≠</T></Abs>
      <Title y={360}>Attention !</Title>
    </AbsoluteFill>
  );
};
const Field: React.FC = () => {
  const t = useT();
  const flash = Math.max(0, 1 - Math.abs(t - 153.8) * 6);
  return (
    <AbsoluteFill>
      <Title>Vérifier <Mark c={VIO} p={prog(t, 152.2, 152.9)}>sur le terrain</Mark></Title>
      <Photo src="promo/terrain-controle.jpg" x={60} y={450} w={960} h={600} pos="55% 35%">
        <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: flash}} />
      </Photo>
      <Row y={1090} gap={18}>
        {[{at: 153.6, l: '📷 Preuves'}, {at: 154.5, l: '📈 Indicateurs'}, {at: 157.0, l: '✓ Problème corrigé ?'}, {at: 159.2, l: '🛡 Risque maîtrisé ?'}].map((c) => <div key={c.l} style={{transform: `scale(${spring(t, c.at)})`}}><Chip c="#fff" size={32} style={{border: `4px solid ${VIO}`}}>{c.l}</Chip></div>)}
      </Row>
    </AbsoluteFill>
  );
};
/** Si le problème persiste : rembobinage vers les causes, puis ajustement. */
const Rewind: React.FC = () => {
  const t = useT();
  const r = prog(t, 160.3, 161.8, easeInOut);
  return (
    <AbsoluteFill>
      <Title>Le problème persiste ?</Title>
      <svg width={700} height={700} style={{position: 'absolute', left: 190, top: 500, transform: `rotate(${-r * 360}deg)`}}>
        <circle cx={350} cy={350} r={270} fill="none" stroke={VIO} strokeWidth={40} strokeDasharray="1500 200" />
        <path d="M 600 220 L 660 340 L 540 330 Z" fill={VIO} />
      </svg>
      <Abs x={340} y={780} w={400} style={{textAlign: 'center'}}><T size={70} color={VIO}>◀◀</T></Abs>
      <Row y={1300} gap={18}>
        {t > 161.3 && <div style={{transform: `scale(${spring(t, 161.3)})`}}><Chip c={RED} light size={36}>Réexamine les causes</Chip></div>}
        {t > 162.6 && <div style={{transform: `scale(${spring(t, 162.6)})`}}><Chip c={GREEN} light size={36}>Ajuste les mesures</Chip></div>}
      </Row>
    </AbsoluteFill>
  );
};

/* ─────────── ÉTAPE 8 : mettre à jour ─────────── */
/** Le tableau vivant : les lignes se réordonnent par priorité, une pousse sort de la feuille. */
const Living: React.FC = () => {
  const t = useT();
  const sw = prog(t, 171.2, 172.4, easeInOut);
  const grow = prog(t, 174.9, 177.4, easeOut);
  const rows = ['Action A', 'Action B', 'Action C', 'Action D'];
  const order = [0, 1, 2, 3].map((i) => (i === 0 ? lerp(0, 2, sw) : i === 2 ? lerp(2, 0, sw) : i));
  return (
    <AbsoluteFill>
      <Title>Un <Mark c={GREEN} p={prog(t, 175.6, 176.4)}>outil vivant</Mark></Title>
      <Abs x={190} y={720} w={700} h={560} style={{background: '#fff', borderRadius: 24, border: `5px solid ${INK}`, overflow: 'hidden'}}>
        <div style={{height: 80, background: INK, display: 'flex', alignItems: 'center', padding: '0 30px'}}><T size={32} color="#fff">Tableau de suivi · mis à jour</T></div>
        {rows.map((r, i) => (
          <div key={r} style={{position: 'absolute', left: 30, right: 30, top: 110 + order[i] * 108, height: 90, borderRadius: 14, background: i === 2 ? `${RED}22` : '#F4F6FA', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between'}}>
            <T size={30}>{r}</T>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: i === 2 ? RED : DIM}}>{i === 2 ? 'priorité ↑' : t > 169.8 + i * 0.3 ? '📎 preuve' : ''}</div>
          </div>
        ))}
      </Abs>
      <svg width={300} height={400} style={{position: 'absolute', left: 390, top: 330}}>
        <path d={`M 150 400 C 150 ${400 - grow * 150}, 150 ${400 - grow * 250}, 150 ${400 - grow * 320}`} stroke="#3E8E41" strokeWidth={14} fill="none" />
        <ellipse cx={110} cy={400 - grow * 220} rx={50 * grow} ry={22 * grow} fill="#4CAF50" transform={`rotate(-30 110 ${400 - grow * 220})`} />
        <ellipse cx={190} cy={400 - grow * 280} rx={50 * grow} ry={22 * grow} fill="#4CAF50" transform={`rotate(30 190 ${400 - grow * 280})`} />
      </svg>
      {t > 177.0 && <Row y={1330}><div style={{transform: `scale(${spring(t, 177.0)})`}}><Chip c={GREEN} light size={40}>↻ Amélioration continue</Chip></div></Row>}
    </AbsoluteFill>
  );
};

export const Steps5to8: React.FC = () => (
  <AbsoluteFill>
    <Sc a={119.2} b={126.9}><Crate /></Sc>
    <Sc a={126.8} b={131.3}><PopUp /></Sc>
    <Sc a={132.9} b={140.7}><Kanban /></Sc>
    <Sc a={140.6} b={144.4}><Meeting /></Sc>
    <Sc a={146.0} b={152.0}><NotEqual /></Sc>
    <Sc a={151.9} b={160.2}><Field /></Sc>
    <Sc a={160.1} b={164.0}><Rewind /></Sc>
    <Sc a={165.6} b={179.3}><Living /></Sc>
  </AbsoluteFill>
);

/* ─────────── CONCLUSION et APPEL À L'ACTION ─────────── */
const Lines: React.FC = () => {
  const t = useT();
  const scroll = (t - 180) * 260;
  const solve = t > 185.0;
  return (
    <AbsoluteFill>
      <Title size={46}>Un bon plan d’action, ce n’est pas…</Title>
      <Abs x={90} y={450} w={420} h={900} style={{background: '#fff', borderRadius: 20, border: `4px solid ${DIM}`, overflow: 'hidden', opacity: solve ? 0.45 : 1}}>
        {Array.from({length: 40}, (_, i) => <div key={i} style={{position: 'absolute', left: 20, right: 20, top: 20 + i * 50 - (scroll % 2000), height: 30, borderRadius: 8, background: '#E3E6EC'}} />)}
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, background: '#fff', textAlign: 'center'}}><T size={30} color={DIM}>+ de lignes</T></div>
      </Abs>
      <Abs x={560} y={450} w={430} h={900} style={{opacity: pop(t, 185.0)}}>
        <PlanSheet w={430} filled={8} labels={false} />
        <div style={{marginTop: 30, textAlign: 'center'}}><Chip c={GREEN} light size={32}>✓ Problèmes résolus</Chip></div>
        <svg width={430} height={220} style={{marginTop: 20}}><path d="M 20 200 Q 140 180 220 120 T 410 20" stroke={GREEN} strokeWidth={12} fill="none" strokeDasharray={520} strokeDashoffset={520 * (1 - prog(t, 186.6, 188.4))} /></svg>
      </Abs>
    </AbsoluteFill>
  );
};
const Cta: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>Tu veux apprendre à…</Title>
      {[{at: 190.3, l: 'Construire un plan d’action pro', ic: 'clipboard'}, {at: 193.4, l: 'Prioriser tes actions', ic: 'cible'}, {at: 194.5, l: 'Suivre leur efficacité', ic: 'graphique'}].map((c, i) => (
        <Abs key={c.l} x={110} y={450 + i * 190} w={860} h={160} style={{opacity: pop(t, c.at), transform: `translateX(${(1 - pop(t, c.at)) * 80}px)`, background: '#fff', borderRadius: 24, border: `4px solid ${GREEN}`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', boxSizing: 'border-box'}}>
          <F n={c.ic} size={90} /><T size={40}>{c.l}</T>
        </Abs>
      ))}
      {t > 196.2 && <Row y={1060}><div style={{transform: `scale(${spring(t, 196.2)})`}}><Chip c={BLUE} light size={44}>💬 Laisse-moi un message en inbox</Chip></div></Row>}
      {t > 200.6 && <Row y={1200}><div style={{transform: `scale(${spring(t, 200.6)})`}}><Chip c={INK} light size={36}>🏅 Système de management ISO</Chip></div></Row>}
    </AbsoluteFill>
  );
};
export const Finale: React.FC = () => (
  <AbsoluteFill>
    <Sc a={179.3} b={190.2}><Lines /></Sc>
    <Sc a={190.1} b={203.0}><Cta /></Sc>
  </AbsoluteFill>
);

