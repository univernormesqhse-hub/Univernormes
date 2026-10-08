import React from 'react';
import {AbsoluteFill, Audio, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, Kinetic, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Backdrop, Check, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Pourquoi faire certifier son entreprise ISO » — UI motion premium (skill video-promo-diagnostic-qhse),
 * voix d'origine, avec des techniques de montage nouvelles dans la série : pièce qui tourne (prestige ou
 * stratégie), autocollants plaqués puis décollés, scanner rayons X, passeport tamponné, portes 3D, bulles
 * qui se décodent, surligneur, vue éclatée remise à plat, carrousel en profondeur, lettres qui tombent,
 * vote d'experts, cercles au feutre, loi barrée, duel « VS », propagation virale, stores vénitiens.
 */
const LOGO = 'promo/logo.png';
const RED = '#D9443A';
const ORANGE = '#E8892B';
const LOGO_AT = 11.8;
const PEEL = 20.7;
const ANG = 28.4;
const EXT = 42.3;
const LANG = 59.0;
const QUOTE = 64.7;
const INT = 82.9;
const BEN = 93.7;
const QUOI = 116.7;
const DEF = 125.5;
const LOI = 143.8;
const VS = 154.3;
const OUTRO_AT = 180.6;
export const CERTIFISO_FRAMES = s(OUTRO_AT + 3.8);

const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style}}>{children}</div>
);
const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = colors.navy, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);
const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);

/** Pastille « ISO 9001 » (générique, pas de logo officiel). */
const Badge: React.FC<{size?: number; tone?: string}> = ({size = 160, tone = colors.green}) => (
  <div style={{width: size, height: size, borderRadius: '50%', background: '#fff', border: `${size * 0.06}px solid ${tone}`, boxShadow: '0 10px 20px rgba(14,30,60,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.3, color: colors.navy, lineHeight: 1}}>ISO</div>
    <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: size * 0.14, color: tone, letterSpacing: 1}}>CERTIFIÉ</div>
  </div>
);

/* ─────────── Transition : stores vénitiens ─────────── */
const Blinds: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  if (t < at - 0.45 || t > at + 0.45) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, pointerEvents: 'none'}}>
      {Array.from({length: 12}, (_, k) => {
        const p = t < at ? prog(t, at - 0.45 + k * 0.012, at - 0.05 + k * 0.012, easeIn) : 1 - prog(t, at + k * 0.012, at + 0.4 + k * 0.012, easeOut);
        return <div key={k} style={{position: 'absolute', left: 0, right: 0, top: k * 160, height: 160, background: k % 2 ? colors.navy : '#16386F', transformOrigin: '50% 0%', transform: `scaleY(${p})`}} />;
      })}
    </AbsoluteFill>
  );
};

/* ─────────── 0 : pièce prestige / stratégie ─────────── */
const Coin: React.FC = () => {
  const t = useT();
  const inP = pop(t, 0.1, 0.6);
  // la pièce tourne, se pose côté « prestige », puis bascule côté « stratégie »
  const spin = 1440 * prog(t, 0.1, 4.0, easeOut) + 180 * prog(t, 6.1, 7.0, easeInOut);
  const a = ((spin % 360) + 360) % 360;
  const front = a < 90 || a > 270;
  const out = prog(t, 10.6, 11.6, easeIn);
  return (
    <AbsoluteFill style={{opacity: 1 - out}}>
      <At x={540} y={820} style={{transform: `translate(-50%, -50%) scale(${(0.5 + 0.5 * inP) * (1 + out * 2)})`}}>
        <div style={{width: 560, height: 560, borderRadius: '50%', transform: `perspective(1600px) rotateY(${spin}deg)`, background: front ? 'radial-gradient(circle at 35% 30%, #F8D77A, #C9962F)' : 'radial-gradient(circle at 35% 30%, #6FD07F, #1F7A2E)', boxShadow: '0 40px 80px rgba(14,30,60,0.3), inset 0 0 0 22px rgba(255,255,255,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: front ? 'none' : 'scaleX(-1)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <F n={front ? 'couronne' : 'cible'} size={200} />
            <Label size={52} color="#fff" style={{textShadow: '0 4px 10px rgba(0,0,0,0.25)'}}>{front ? 'Prestige ?' : 'Stratégie ?'}</Label>
          </div>
        </div>
      </At>
      <Kinetic text="Pourquoi se faire *certifier ISO* ?" at={0.4} until={4.0} y={1360} size={78} />
      <Kinetic text="Pour la *frime* ?" at={4.2} until={6.0} y={1360} size={92} accent={ORANGE} />
      <Kinetic text="Ou un vrai avantage *stratégique* ?" at={6.2} until={10.4} y={1360} size={74} />
    </AbsoluteFill>
  );
};

/* ─────────── 1 : le logo partout (autocollants), puis décollé ─────────── */
const SUPPORTS: [string, string, number, number, number][] = [['camion', 'Camions', 290, 640, 14.4], ['ordinateur', 'Sites web', 790, 780, 15.2], ['colis', 'Emballages', 330, 1130, 16.1]];
const Stickers: React.FC = () => {
  const t = useT();
  const peel = prog(t, PEEL + 0.6, PEEL + 2.0, easeInOut);
  const rain = prog(t, 17.3, 20.2, (v) => v);
  const perf = pop(t, PEEL + 1.4, 0.6);
  return (
    <AbsoluteFill>
      {/* sous la couche : la performance */}
      {perf > 0 && (
        <AbsoluteFill>
          <At x={540} y={820} style={{transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * perf})`, opacity: perf}}>
            <div style={{width: 820, height: 640, borderRadius: 34, background: '#fff', boxShadow: shadow, padding: 50, boxSizing: 'border-box'}}>
              <Label size={40} style={{textAlign: 'left'}}>Impact réel sur la performance</Label>
              <svg width={720} height={420} style={{marginTop: 20}}>
                {[0, 1, 2, 3, 4, 5].map((k) => {
                  const h = (80 + k * 55) * prog(t, PEEL + 2.0 + k * 0.15, PEEL + 2.6 + k * 0.15);
                  return <rect key={k} x={30 + k * 115} y={400 - h} width={80} height={h} rx={14} fill={k === 5 ? colors.green : '#C9D3E2'} />;
                })}
                <path d="M70 330 L185 290 L300 250 L415 190 L530 140 L645 60" fill="none" stroke={ORANGE} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, PEEL + 2.4, PEEL + 3.6)} 1`} />
              </svg>
            </div>
          </At>
          <Kinetic text="Au-delà de *l'image*" at={PEEL + 0.2} until={24.2} y={1360} size={86} />
          <Kinetic text="Quel impact sur la *performance* ?" at={24.3} until={ANG - 0.4} y={1360} size={72} />
        </AbsoluteFill>
      )}
      {/* couche « image » qui se décolle en diagonale, avec son pli */}
      {peel < 1 && (() => {
        const L = (1 - peel) * 3000;
        return (
          <AbsoluteFill>
            <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', clipPath: `polygon(0px 0px, ${L}px 0px, 0px ${L}px)`}}>
              {SUPPORTS.map(([n, l, x, y, at]) => {
                const p = pop(t, at - 0.6, 0.5);
                const slap = prog(t, at, at + 0.22, easeOut);
                return (
                  <At key={n} x={x} y={y} style={{opacity: p, transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * p})`}}>
                    <div style={{width: 380, height: 300, borderRadius: 34, background: '#fff', boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                      <F n={n} size={180} />
                      <Label size={32}>{l}</Label>
                      {t >= at && <div style={{position: 'absolute', right: -30, top: -40, transform: `scale(${2.2 - 1.2 * slap}) rotate(${-12 + (1 - slap) * 30}deg)`, opacity: slap}}><Badge size={130} /></div>}
                    </div>
                  </At>
                );
              })}
              {Array.from({length: 26}, (_, k) => {
                const st = random(`r${k}`) * 0.7;
                const p = prog(rain, st, st + 0.3, easeIn);
                if (p <= 0) return null;
                return <At key={k} x={60 + random(`x${k}`) * 960} y={-100 + p * (1000 + random(`y${k}`) * 200)} style={{transform: `translate(-50%, -50%) rotate(${random(`a${k}`) * 60 - 30}deg)`}}><Badge size={80 + random(`s${k}`) * 40} /></At>;
              })}
              <Kinetic text="Ce logo est *partout*" at={LOGO_AT} until={17.1} y={1440} size={88} />
              <Kinetic text="Un gage de qualité *quasi universel*" at={17.3} until={PEEL + 0.3} y={1440} size={72} />
            </AbsoluteFill>
            {peel > 0 && <div style={{position: 'absolute', left: L / 2 - 1500, top: L / 2 - 70, width: 3000, height: 140, transform: 'rotate(-45deg)', transformOrigin: '50% 50%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(230,225,212,1) 48%, #FFFFFF 62%, rgba(14,30,60,0.25) 64%, rgba(0,0,0,0) 100%)'}} />}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── 2 : deux angles — scanner rayons X ─────────── */
const XRay: React.FC = () => {
  const t = useT();
  const inP = pop(t, ANG + 0.3, 0.6);
  const scan = prog(t, 37.0, 39.4, easeInOut);
  const sy = 470 + scan * 760;
  const Building: React.FC<{inside: boolean}> = ({inside}) => (
    <div style={{position: 'absolute', left: 190, top: 470, width: 700, height: 760, borderRadius: 30, background: inside ? '#0E2A5C' : '#fff', boxShadow: shadow, overflow: 'hidden'}}>
      {!inside && (
        <>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 120, background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={40} color="#fff">Votre entreprise</Label></div>
          {Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: 70 + (k % 3) * 200, top: 170 + Math.floor(k / 3) * 170, width: 160, height: 120, borderRadius: 14, background: '#DCE6F3'}} />)}
          <div style={{position: 'absolute', left: 290, top: 640, width: 120, height: 120, background: '#C9D3E2', borderRadius: '14px 14px 0 0'}} />
          <div style={{position: 'absolute', right: 30, top: 140}}><Badge size={150} /></div>
        </>
      )}
      {inside && (
        <>
          {[['engrenage', 160, 230], ['equipe', 520, 230], ['clipboard', 160, 560], ['graphique', 520, 560]].map(([n, x, y], k) => (
            <div key={k} style={{position: 'absolute', left: (x as number) - 90, top: (y as number) - 90, transform: `rotate(${n === 'engrenage' ? t * 60 : 0}deg)`}}><F n={n as string} size={180} /></div>
          ))}
          {Array.from({length: 14}, (_, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: k * 56, height: 1, background: 'rgba(124,197,118,0.25)'}} />)}
        </>
      )}
    </div>
  );
  return (
    <AbsoluteFill style={{opacity: inP, transform: `translateY(${(1 - inP) * 60}px)`}}>
      <Kinetic text="Deux *angles*" at={ANG + 0.2} until={33.6} y={330} size={86} />
      <Kinetic text="L'*extérieur* : l'image de marque" at={33.8} until={36.9} y={330} size={64} />
      <Kinetic text="L'*intérieur* : la transformation" at={37.0} y={330} size={64} />
      <Building inside={false} />
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 ${1920 - sy}px 0)`}}><Building inside /></div>
      {scan > 0 && scan < 1 && <div style={{position: 'absolute', left: 150, width: 780, top: sy - 4, height: 8, borderRadius: 4, background: colors.greenLight, boxShadow: '0 0 30px 10px rgba(124,197,118,0.7)'}} />}
    </AbsoluteFill>
  );
};

/* ─────────── 3 : externe — passeport tamponné, portes ─────────── */
const STAMPS: [string, number, number, number, string][] = [['Clients rassurés', 47.6, 300, -8, colors.green], ['Partenaires', 48.8, 640, 6, colors.navy], ['Entreprise sérieuse', 50.4, 470, -4, ORANGE]];
const Passport: React.FC = () => {
  const t = useT();
  const open = prog(t, EXT + 2.2, EXT + 3.2, easeInOut);
  const leave = prog(t, 52.0, 52.6, easeIn);
  const doors = prog(t, 53.0, 54.6, easeInOut);
  const pub = pop(t, 55.4, 0.5);
  return (
    <AbsoluteFill>
      <Kinetic text="Un *passeport* pour le marché" at={EXT + 0.2} until={51.9} y={330} size={74} />
      {leave < 1 && (
        <At x={540} y={880} style={{transform: `translate(-50%, -50%) translateY(${-leave * 1400}px)`}}>
          <div style={{position: 'relative', width: 880, height: 640, perspective: 2200}}>
            {/* page intérieure */}
            <div style={{position: 'absolute', left: 440, top: 0, width: 440, height: 640, background: '#FFFDF6', borderRadius: '0 26px 26px 0', boxShadow: shadow}} />
            <div style={{position: 'absolute', left: 0, top: 0, width: 440, height: 640, background: '#FFFDF6', borderRadius: '26px 0 0 26px', boxShadow: shadow, opacity: open > 0.5 ? 1 : 0}} />
            {open > 0.5 && STAMPS.map(([l, at, x, r, c]) => {
              const p = pop(t, at, 0.22);
              return p > 0 ? <div key={l} style={{position: 'absolute', left: x - 200, top: 100 + STAMPS.findIndex((q) => q[0] === l) * 170, width: 400, transform: `scale(${2 - p}) rotate(${r}deg)`, opacity: p, border: `7px solid ${c}`, borderRadius: 18, color: c, fontFamily: sansFont, fontWeight: 900, fontSize: 40, textAlign: 'center', padding: '10px 0', background: 'rgba(255,255,255,0.6)'}}>{l.toUpperCase()} ✓</div> : null;
            })}
            {/* couverture */}
            <div style={{position: 'absolute', left: 440, top: 0, width: 440, height: 640, borderRadius: '0 26px 26px 0', background: colors.navy, transformOrigin: '0 50%', transform: `rotateY(${-open * 180}deg)`, backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: shadow}}>
              <Label size={46} color="#F8D77A">Passeport</Label>
              <Badge size={190} tone="#F8D77A" />
              <Label size={30} color="#F8D77A">Marché</Label>
            </div>
          </div>
        </At>
      )}
      {leave > 0 && (
        <AbsoluteFill>
          <Kinetic text="Des *portes* qui s'ouvrent" at={52.2} until={55.2} y={330} size={80} />
          <Kinetic text="Marchés publics : souvent *obligatoire*" at={55.4} until={LANG - 0.3} y={330} size={64} accent={RED} />
          <At x={540} y={900}>
            <div style={{position: 'relative', width: 760, height: 900, perspective: 1800}}>
              <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 45%, #FFF3C4, #F4D27A)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
                <div style={{transform: `scale(${pub})`}}><F n="temple" size={300} /></div>
                <div style={{opacity: pub}}><Label size={50}>Marchés publics</Label></div>
              </div>
              {[0, 1].map((k) => (
                <div key={k} style={{position: 'absolute', top: 0, left: k ? 380 : 0, width: 380, height: 900, background: 'linear-gradient(180deg, #7A4B2A, #5E3820)', border: '10px solid #4A2C18', boxSizing: 'border-box', transformOrigin: k ? '100% 50%' : '0% 50%', transform: `rotateY(${(k ? 1 : -1) * doors * 105}deg)`, boxShadow: 'inset 0 0 40px rgba(0,0,0,0.35)'}}>
                  <div style={{position: 'absolute', top: 430, [k ? 'left' : 'right']: 30, width: 26, height: 70, borderRadius: 13, background: '#D9A23A'}} />
                  {[0, 1].map((r) => <div key={r} style={{position: 'absolute', left: 40, right: 40, top: 60 + r * 420, height: 340, border: '6px solid rgba(0,0,0,0.18)', borderRadius: 12}} />)}
                </div>
              ))}
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 4 : même langage — bulles qui se décodent ─────────── */
const GLYPH = '#@%&$?!§*+=';
const Decode: React.FC<{word: string; at: number; dur: number}> = ({word, at, dur}) => {
  const t = useT();
  const p = prog(t, at, at + dur, (v) => v);
  const n = Math.floor(p * word.length);
  const f = Math.floor(t * 20);
  return <span>{[...word].map((c, i) => (i < n ? c : GLYPH[Math.floor(random(`${i}${f}`) * GLYPH.length)])).join('')}</span>;
};
const Language: React.FC = () => {
  const t = useT();
  const inP = pop(t, LANG + 0.1, 0.5);
  const meet = prog(t, 62.6, 63.6, easeInOut);
  return (
    <AbsoluteFill style={{opacity: inP}}>
      <Kinetic text="Parler le *même langage*" at={LANG + 0.2} y={330} size={84} />
      <At x={190} y={1150}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="femme-bureau" size={210} /><Label size={30}>Client</Label></div></At>
      <At x={890} y={1150}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="homme-bureau" size={210} /><Label size={30}>Entreprise</Label></div></At>
      {[0, 1].map((k) => {
        const x0 = k ? 760 : 320;
        const x = x0 + (540 - x0) * meet;
        const y = 720 + k * 220 - meet * (k ? 220 : 0) + meet * 0;
        return (
          <At key={k} x={x} y={k ? 940 - meet * 110 : 720 + meet * 110} style={{transform: `translate(-50%, -50%) scale(${pop(t, LANG + 0.5 + k * 0.4, 0.4)})`, opacity: meet > 0.9 && k ? 0 : 1}}>
            <div style={{position: 'relative', background: k ? colors.navy : colors.green, color: '#fff', borderRadius: 40, padding: '30px 50px', fontFamily: 'monospace, ' + sansFont, fontWeight: 900, fontSize: 64, minWidth: 380, textAlign: 'center', boxShadow: shadow}}>
              <Decode word="QUALITÉ" at={LANG + 1.2 + k * 0.5} dur={2.6} />
              <div style={{position: 'absolute', bottom: -26, [k ? 'right' : 'left']: 60, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${k ? colors.navy : colors.green}`}} />
            </div>
          </At>
        );
      })}
      {meet >= 1 && <At x={540} y={590} style={{transform: `translate(-50%, -50%) scale(${pop(t, 63.6, 0.3)})`}}><Check p={prog(t, 63.7, 64.1)} size={110} /></At>}
    </AbsoluteFill>
  );
};

/* ─────────── 5 : citation — surligneur, + qui devient bouclier ─────────── */
const Quote: React.FC = () => {
  const t = useT();
  const inP = pop(t, QUOTE + 0.1, 0.5);
  const hl = prog(t, 76.5, 77.6, easeInOut);
  const grow = prog(t, 76.3, 77.4, easeInOut);
  return (
    <AbsoluteFill>
      <At x={540} y={700} style={{transform: `translate(-50%, -50%) translateY(${(1 - inP) * 80}px) rotate(-1.5deg)`, opacity: inP}}>
        <div style={{width: 900, borderRadius: 30, background: '#fff', boxShadow: shadow, padding: '60px 60px 50px', boxSizing: 'border-box', position: 'relative'}}>
          <div style={{position: 'absolute', left: 30, top: -40, fontFamily: 'Georgia, serif', fontSize: 200, color: colors.green, lineHeight: 1}}>“</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 52, color: colors.ink, lineHeight: 1.3}}>
            La certification constitue une{' '}
            <span style={{backgroundImage: `linear-gradient(90deg, rgba(248,215,122,0.95) ${hl * 100}%, transparent ${hl * 100}%)`, padding: '0 6px', borderRadius: 6}}>garantie de qualité</span>{' '}
            pour l'acheteur public.
          </div>
          <div style={{marginTop: 24, fontFamily: handFont, fontSize: 40, color: '#8A93A0'}}>— Idée résumée par la vidéo d'origine</div>
        </div>
      </At>
      {/* argent public : pas de place pour le risque */}
      <At x={300} y={1250} style={{opacity: pop(t, 68.9), transform: `translate(-50%, -50%) scale(${pop(t, 68.9, 0.4)})`}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="argent" size={190} /><Label size={30}>Argent public</Label></div></At>
      <At x={780} y={1250} style={{opacity: pop(t, 71.2)}}>
        <div style={{position: 'relative', width: 340, height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {grow < 1 && <div style={{position: 'absolute', fontFamily: sansFont, fontWeight: 900, fontSize: 160 * (1 - grow) + 10, color: '#B9C0C8', opacity: 1 - grow}}>+</div>}
          <div style={{transform: `scale(${0.2 + 0.8 * grow})`, opacity: grow}}><F n="bouclier" size={260} /></div>
          {t < 76.3 && <div style={{position: 'absolute', bottom: -10}}><Label size={26} color="#8A93A0">Un petit plus ?</Label></div>}
          {grow > 0.5 && <div style={{position: 'absolute', bottom: -30}}><Label size={30} color={colors.green}>Garantie essentielle</Label></div>}
        </div>
      </At>
      <Kinetic text="*Zéro* risque permis" at={71.2} until={76.2} y={1460} size={70} accent={RED} />
      <Kinetic text="Un système *fiable*" at={78.4} until={INT - 0.4} y={1460} size={80} />
    </AbsoluteFill>
  );
};

/* ─────────── 6 : intérieur — vue éclatée remise à plat ─────────── */
const PARTS: [string, string][] = [['engrenage', 'Processus'], ['equipe', 'Équipes'], ['clipboard', 'Procédures'], ['graphique', 'Indicateurs'], ['cible', 'Objectifs'], ['loupe', 'Contrôles']];
const Exploded: React.FC = () => {
  const t = useT();
  const boom = prog(t, 88.6, 90.0, easeOut);
  const flat = prog(t, 92.2, 93.3, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="À l'intérieur, la *magie* opère" at={INT + 0.2} until={88.3} y={330} size={74} />
      <Kinetic text="S'*auto-analyser*" at={88.5} until={92.0} y={330} size={84} />
      <Kinetic text="Tout remettre *à plat*" at={92.1} y={330} size={84} accent={ORANGE} />
      {PARTS.map(([n, l], k) => {
        const z = k * 60;
        // empilé (vue 3D) → éclaté → grille à plat
        const sx = 540, sy = 1000 - k * 40;
        const ang = (k / PARTS.length) * Math.PI * 2;
        const ex = 540 + Math.cos(ang) * 330, ey = 900 + Math.sin(ang) * 380;
        const gx = 260 + (k % 3) * 280, gy = 680 + Math.floor(k / 3) * 380;
        const x = (sx + (ex - sx) * boom) * (1 - flat) + gx * flat;
        const y = (sy + (ey - sy) * boom) * (1 - flat) + gy * flat;
        const tilt = (1 - flat) * 55;
        return (
          <At key={n} x={x} y={y} style={{zIndex: 10 + k, transform: `translate(-50%, -50%) perspective(1400px) rotateX(${tilt}deg) rotateZ(${(1 - flat) * (boom * (k - 2.5) * 6 - 20)}deg)`, opacity: pop(t, INT + 0.4 + k * 0.12)}}>
            <div style={{width: 250, height: 250, borderRadius: 34, background: '#fff', boxShadow: `0 ${10 + z * 0.2}px 30px rgba(14,30,60,0.2)`, borderBottom: `10px solid ${k % 2 ? colors.green : colors.navy}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <F n={n} size={140} />
              <Label size={26}>{l}</Label>
            </div>
          </At>
        );
      })}
    </AbsoluteFill>
  );
};

/* ─────────── 7 : bénéfices internes — carrousel en profondeur ─────────── */
const BENS: {at: number; t: string; c: string}[] = [
  {at: 93.7, t: 'Méthodes harmonisées', c: colors.navy},
  {at: 98.8, t: 'Gaspillages traqués', c: ORANGE},
  {at: 102.3, t: 'Coûts de non-qualité réduits', c: RED},
  {at: 108.7, t: 'Équipes motivées', c: colors.green},
  {at: 110.7, t: 'Savoir-faire protégé', c: '#6B4FA0'},
];
const BenVisual: React.FC<{i: number; at: number}> = ({i, at}) => {
  const t = useT();
  const p = prog(t, at + 0.3, at + 2.2, easeInOut);
  if (i === 0) {
    // flèches dans tous les sens → toutes alignées
    return (
      <svg width={460} height={300}>
        {Array.from({length: 7}, (_, k) => {
          const r = (random(`h${k}`) - 0.5) * 300 * (1 - p);
          const y = 30 + k * 40;
          return <g key={k} transform={`translate(230 ${y}) rotate(${r})`}><line x1={-150} y1={0} x2={130} y2={0} stroke={colors.navy} strokeWidth={10} strokeLinecap="round" /><path d="M130 -16 L160 0 L130 16 Z" fill={colors.navy} /></g>;
        })}
      </svg>
    );
  }
  if (i === 1) {
    // entonnoir qui capte les gaspillages
    return (
      <svg width={460} height={300}>
        <path d="M80 30 H380 L260 170 V270 H200 V170 Z" fill="#FCE3CC" stroke={ORANGE} strokeWidth={8} />
        {Array.from({length: 6}, (_, k) => {
          const q = ((t - at) * 0.8 + k / 6) % 1;
          return <circle key={k} cx={120 + random(`f${k}`) * 220 + (230 - 120 - random(`f${k}`) * 220) * Math.min(1, q * 1.6)} cy={10 + q * 280} r={14} fill={ORANGE} opacity={1 - q} />;
        })}
      </svg>
    );
  }
  if (i === 2) {
    // seau percé : la fuite d'argent se colmate
    const leak = 1 - p;
    return (
      <svg width={460} height={300}>
        <path d="M120 40 H340 L310 250 H150 Z" fill="#E7E9EE" stroke={colors.navy} strokeWidth={8} />
        <rect x={150} y={250 - 160 * (0.3 + 0.7 * p)} width={160} height={160 * (0.3 + 0.7 * p)} fill="rgba(46,155,62,0.45)" />
        {Array.from({length: 5}, (_, k) => {
          const q = ((t - at) * 1.3 + k / 5) % 1;
          return leak > 0.05 ? <text key={k} x={330 + q * 70} y={200 + q * 90} fontFamily={sansFont} fontWeight={900} fontSize={34} fill={RED} opacity={leak}>€</text> : null;
        })}
        <circle cx={318} cy={190} r={22 * p} fill={colors.green} />
      </svg>
    );
  }
  if (i === 3) {
    // batterie d'équipe qui se charge
    return (
      <svg width={460} height={300}>
        <rect x={60} y={80} width={300} height={150} rx={22} fill="none" stroke={colors.navy} strokeWidth={10} />
        <rect x={360} y={125} width={26} height={60} rx={8} fill={colors.navy} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={78 + k * 70} y={98} width={58} height={114} rx={10} fill={p > (k + 0.5) / 4 ? colors.green : '#E7E9EE'} />)}
        <text x={230} y={60} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={40} fill={colors.green}>{Math.round(p * 100)} %</text>
      </svg>
    );
  }
  // coffre-fort qui se referme sur le savoir-faire
  return (
    <svg width={460} height={300}>
      <rect x={110} y={30} width={240} height={240} rx={24} fill="#E7E9EE" stroke={colors.navy} strokeWidth={8} />
      <text x={230} y={170} textAnchor="middle" fontSize={90}>📘</text>
      <g transform={`translate(110 30) scale(${Math.max(0.02, p)} 1)`}>
        <rect x={0} y={0} width={240} height={240} rx={24} fill="#6B4FA0" />
        <circle cx={120} cy={120} r={50} fill="none" stroke="#fff" strokeWidth={10} />
        <line x1={120} y1={120} x2={120 + Math.cos(t * 3) * 40} y2={120 + Math.sin(t * 3) * 40} stroke="#fff" strokeWidth={8} />
      </g>
    </svg>
  );
};
const Carousel: React.FC = () => {
  const t = useT();
  const pos = BENS.reduce((a, b, i) => a + (i ? prog(t, b.at - 0.4, b.at + 0.2, easeInOut) : 0), 0);
  return (
    <AbsoluteFill>
      <Kinetic text="5 effets *en interne*" at={BEN} until={QUOI - 0.4} y={330} size={84} />
      {BENS.map((b, i) => {
        const d = i - pos;
        if (Math.abs(d) > 2.2) return null;
        const x = 540 + d * 470;
        const sc = 1 - Math.min(1, Math.abs(d)) * 0.28;
        return (
          <At key={b.t} x={x} y={900} style={{zIndex: 20 - Math.round(Math.abs(d) * 4), transform: `translate(-50%, -50%) perspective(1600px) rotateY(${-d * 38}deg) scale(${sc})`, opacity: pop(t, b.at - 0.6) * (1 - Math.min(0.6, Math.abs(d) * 0.35))}}>
            <div style={{width: 600, height: 720, borderRadius: 40, background: '#fff', boxShadow: shadow, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{alignSelf: 'stretch', height: 150, background: b.c, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: 'rgba(255,255,255,0.45)'}}>0{i + 1}</div>
              </div>
              <div style={{marginTop: 50}}><BenVisual i={i} at={b.at} /></div>
              <Label size={46} style={{marginTop: 40, padding: '0 40px'}}>{b.t}</Label>
            </div>
          </At>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1360, display: 'flex', justifyContent: 'center', gap: 18}}>
        {BENS.map((b, i) => <div key={i} style={{width: Math.round(pos) === i ? 60 : 20, height: 20, borderRadius: 10, background: Math.round(pos) === i ? b.c : '#D5D9DE'}} />)}
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── 8 : POURQUOI → QUOI (lettres qui tombent) ─────────── */
const Why: React.FC = () => {
  const t = useT();
  const word = 'POURQUOI';
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center'}}>
        {[...word].map((c, i) => {
          const falls = i < 4;
          const f = falls ? prog(t, 118.8 + i * 0.08, 119.6 + i * 0.08, easeIn) : 0;
          const slide = prog(t, 119.6, 120.2, easeInOut);
          return (
            <span key={i} style={{display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 170, color: falls ? colors.navy : colors.green, transform: `translate(${falls ? 0 : -slide * 0}px, ${f * 1300}px) rotate(${f * (i % 2 ? 50 : -40)}deg)`, opacity: pop(t, QUOI + 0.1 + i * 0.05), width: falls ? 125 * (1 - slide) : undefined, overflow: 'visible'}}>{c}</span>
          );
        })}
      </div>
      <Kinetic text="On a vu le *pourquoi*" at={QUOI + 0.2} until={118.5} y={500} size={80} />
      <Kinetic text="Passons au *quoi*" at={118.6} until={120.3} y={500} size={80} />
      <Kinetic text="C'est quoi, *une norme* ?" at={120.4} y={500} size={84} />
      <At x={540} y={1180} style={{opacity: pop(t, 122.5), transform: `translate(-50%, -50%) scale(${pop(t, 122.5, 0.4)})`}}><F n="livres" size={240} /></At>
    </AbsoluteFill>
  );
};

/* ─────────── 9 : définition — cercles au feutre, vote d'experts ─────────── */
const Circle: React.FC<{p: number; w: number; h: number; color?: string}> = ({p, w, h, color = RED}) => (
  <svg width={w + 40} height={h + 40} style={{position: 'absolute', left: -20, top: -20, pointerEvents: 'none'}}>
    <path d={`M${w * 0.1 + 20} ${h * 0.15 + 20} C ${w * 0.4} 0, ${w + 30} 10, ${w + 25} ${h / 2 + 20} S ${w * 0.6} ${h + 45}, 25 ${h * 0.7 + 20} S ${w * 0.2} 8, ${w * 0.55} 22`} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />
  </svg>
);
const Definition: React.FC = () => {
  const t = useT();
  const card = pop(t, DEF + 0.2, 0.5);
  const c1 = prog(t, 130.4, 131.4);
  const c2 = prog(t, 138.4, 139.6);
  const up = prog(t, 131.8, 132.4, easeInOut);
  const experts = ['homme-bureau', 'femme-bureau', 'auditeur', 'directeur', 'formatrice', 'ouvrier'];
  const usage = prog(t, 140.1, 143.5, easeIn);
  const cnt = Math.round(Math.pow(10, usage * 3));
  return (
    <AbsoluteFill>
      <At x={540} y={620 - up * 160} style={{transform: `translate(-50%, -50%) scale(${(0.9 + 0.1 * card) * (1 - up * 0.25)})`, opacity: card}}>
        <div style={{width: 900, borderRadius: 30, background: '#FFFDF6', boxShadow: shadow, padding: '44px 54px', boxSizing: 'border-box'}}>
          <div style={{fontFamily: 'Georgia, serif', fontSize: 64, fontWeight: 700, color: colors.navy}}>norme <span style={{fontSize: 34, fontStyle: 'italic', color: '#8A93A0'}}>n. f.</span></div>
          <div style={{fontFamily: 'Georgia, serif', fontSize: 40, color: colors.ink, lineHeight: 1.45, marginTop: 16}}>
            Document établi par{' '}
            <span style={{position: 'relative', display: 'inline-block'}}>consensus<Circle p={c1} w={200} h={50} /></span>
            , qui fournit des règles pour des{' '}
            <span style={{position: 'relative', display: 'inline-block'}}>usages communs et répétés<Circle p={c2} w={470} h={50} color={colors.green} /></span>.
          </div>
          <div style={{marginTop: 14, fontFamily: handFont, fontSize: 32, color: '#8A93A0'}}>D'après la définition ISO résumée par la vidéo d'origine</div>
        </div>
      </At>
      {/* vote : un groupe d'experts se met d'accord */}
      {up > 0 && t < 138.0 && (
        <AbsoluteFill style={{opacity: up * (1 - prog(t, 137.6, 138.0))}}>
          {experts.map((n, k) => {
            const a = (k / experts.length) * Math.PI * 2 - Math.PI / 2;
            const x = 540 + Math.cos(a) * 300, y = 1150 + Math.sin(a) * 250;
            const single = t < 135.5;
            const on = single ? k === 0 : prog(t, 135.8 + k * 0.2, 136.0 + k * 0.2) > 0;
            return (
              <At key={n} x={x} y={y} style={{opacity: single && k ? 0.25 : 1}}>
                <div style={{position: 'relative'}}><F n={n} size={150} />
                  {!single && on && <div style={{position: 'absolute', right: -20, top: -20, transform: `scale(${pop(t, 135.8 + k * 0.2, 0.25)})`}}><Check p={1} size={60} /></div>}
                </div>
              </At>
            );
          })}
          <At x={540} y={1150}><div style={{width: 230, height: 230, borderRadius: '50%', background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={30} color={t < 135.5 ? RED : colors.green}>{t < 135.5 ? 'Seul ? Non' : 'Consensus'}</Label></div></At>
        </AbsoluteFill>
      )}
      {t >= 138.0 && (
        <AbsoluteFill style={{opacity: pop(t, 138.1)}}>
          <At x={540} y={1130}><div style={{transform: `rotate(${t * 140}deg)`}}><F n="engrenage" size={260} /></div></At>
          <At x={540} y={1360}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: colors.navy, fontVariantNumeric: 'tabular-nums'}}>× {cnt.toLocaleString('fr-FR')}</div></At>
          <At x={540} y={1460}><Label size={30} color="#8A93A0">La meilleure façon de faire, à chaque fois</Label></At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 10 : pas une loi, une recette ─────────── */
const Recipe: React.FC = () => {
  const t = useT();
  const strike = prog(t, 145.4, 146.2, easeInOut);
  const card = pop(t, 146.5, 0.5);
  const chefs = [149.3, 149.7, 150.1];
  return (
    <AbsoluteFill>
      <At x={540} y={560 - card * 20} style={{transform: `translate(-50%, -50%) scale(${1 - 0.25 * card})`, opacity: pop(t, LOI + 0.2)}}>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 30, padding: '20px 40px', boxShadow: shadow}}>
          <F n="juge" size={130} />
          <Label size={60}>Une loi imposée</Label>
          <div style={{position: 'absolute', left: 20, top: '50%', height: 12, borderRadius: 6, background: RED, width: `${strike * 94}%`, transform: 'rotate(-4deg)'}} />
        </div>
      </At>
      {card > 0 && (
        <At x={540} y={1060} style={{transform: `translate(-50%, -50%) rotate(${(1 - card) * 8 + 2}deg) scale(${0.8 + 0.2 * card})`, opacity: card}}>
          <div style={{width: 820, borderRadius: 26, background: '#FFFDF6', boxShadow: shadow, padding: '40px 50px', boxSizing: 'border-box', backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 58px, rgba(61,125,216,0.18) 58px 60px)'}}>
            <div style={{fontFamily: handFont, fontSize: 70, color: colors.navy}}>La meilleure recette</div>
            {['Les meilleures pratiques', 'Validées par les experts', 'Résultat constant'].map((l, k) => (
              <div key={l} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 18, opacity: pop(t, 147.3 + k * 0.5)}}>
                <Check p={prog(t, 147.4 + k * 0.5, 147.8 + k * 0.5)} size={50} />
                <div style={{fontFamily: handFont, fontSize: 48, color: colors.ink}}>{l}</div>
              </div>
            ))}
            <div style={{display: 'flex', gap: 30, marginTop: 30, justifyContent: 'center'}}>
              {chefs.map((at, k) => <div key={k} style={{transform: `scale(${pop(t, at, 0.3)})`}}><F n="cuisinier" size={120} /></div>)}
            </div>
          </div>
        </At>
      )}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1420, display: 'flex', justifyContent: 'center', gap: 30}}>
        {[0, 1, 2].map((k) => <div key={k} style={{transform: `scale(${pop(t, 151.6 + k * 0.4, 0.3)})`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="assiette" size={110} /><div style={{color: '#F2B630', fontSize: 34}}>★★★</div></div>)}
      </div>
      <Kinetic text="Pas une *loi*…" at={LOI + 0.1} until={146.3} y={330} size={84} accent={RED} />
      <Kinetic text="… la meilleure *recette*" at={146.5} until={VS - 0.4} y={330} size={84} />
    </AbsoluteFill>
  );
};

/* ─────────── 11 : NORME vs STANDARD ─────────── */
const Fighter: React.FC<{side: -1 | 1; title: string; color: string; icon: string; lines: [string, number][]; tag: string; tagAt: number}> = ({side, title, color, icon, lines, tag, tagAt}) => {
  const t = useT();
  const inP = prog(t, VS + 4.0 + (side > 0 ? 0.25 : 0), VS + 4.6 + (side > 0 ? 0.25 : 0), easeOut);
  const st = pop(t, tagAt, 0.25);
  return (
    <div style={{position: 'absolute', top: 520, left: side < 0 ? 40 : 560, width: 480, transform: `translateX(${(1 - inP) * side * 700}px)`}}>
      <div style={{borderRadius: 34, background: '#fff', boxShadow: shadow, overflow: 'hidden', borderTop: `18px solid ${color}`, padding: '30px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 760, boxSizing: 'border-box', position: 'relative'}}>
        <F n={icon} size={150} />
        <Label size={54} color={color} style={{marginTop: 8}}>{title}</Label>
        {lines.map(([l, at]) => (
          <div key={l} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, alignSelf: 'stretch', opacity: pop(t, at), transform: `translateX(${(1 - pop(t, at, 0.4)) * side * 60}px)`}}>
            <div style={{width: 16, height: 16, borderRadius: 8, background: color, flexShrink: 0}} />
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.ink}}>{l}</div>
          </div>
        ))}
        {st > 0 && <div style={{position: 'absolute', bottom: 40, transform: `scale(${2 - st}) rotate(${side * -6}deg)`, opacity: st, border: `7px solid ${color}`, color, borderRadius: 16, padding: '6px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, fontStyle: 'italic', background: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap'}}>{tag}</div>}
      </div>
    </div>
  );
};
const Versus: React.FC = () => {
  const t = useT();
  const vs = prog(t, VS + 4.6, VS + 5.0, easeOut);
  const pdf = prog(t, 174.4, 177.4, (v) => v);
  const n = Math.min(48, Math.floor(Math.pow(2, pdf * 5.6)));
  const viral = t >= 174.3;
  return (
    <AbsoluteFill>
      <Kinetic text="Attention, *subtilité* !" at={VS + 0.1} until={158.0} y={330} size={84} accent={ORANGE} />
      <Kinetic text="Norme *ou* standard ?" at={158.1} y={330} size={88} />
      {!viral && (
        <>
          <Fighter side={-1} title="Norme" color={colors.navy} icon="medaille" lines={[['Officielle', 161.3], ['Validée par un organisme (ISO)', 162.8]]} tag="DE JURE" tagAt={165.2} />
          <Fighter side={1} title="Standard" color={ORANGE} icon="globe" lines={[['Imposé par l\'usage', 167.4], ['Ex. : le format PDF', 169.0]]} tag="DE FACTO" tagAt={168.1} />
          {vs > 0 && <At x={540} y={900} style={{transform: `translate(-50%, -50%) scale(${2.5 - 1.5 * vs}) rotate(-8deg)`, opacity: vs, zIndex: 5}}><div style={{width: 170, height: 170, borderRadius: '50%', background: RED, border: '8px solid #fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: '#fff', fontStyle: 'italic'}}>VS</div></At>}
        </>
      )}
      {viral && (
        <AbsoluteFill style={{opacity: pop(t, 174.3)}}>
          <div style={{position: 'absolute', left: 90, top: 520, width: 900, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14}}>
            {Array.from({length: 48}, (_, k) => (
              <div key={k} style={{height: 130, borderRadius: 12, background: k < n ? '#fff' : 'transparent', boxShadow: k < n ? '0 6px 12px rgba(14,30,60,0.15)' : 'none', borderTop: k < n ? `16px solid ${RED}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${k < n ? 1 : 0.3})`, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: RED}}>{k < n ? 'PDF' : ''}</div>
            ))}
          </div>
          <At x={540} y={1360}><Label size={44}>Adopté par tous… <span style={{color: ORANGE}}>standard de fait</span></Label></At>
          <At x={540} y={1460} style={{opacity: pop(t, 178.7)}}><Label size={34} color="#8A93A0">Personne ne l'a imposé officiellement</Label></At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Son ─────────── */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  {at: 0.2, s: 'riser', v: 0.25, dur: 1.5},
  ...Array.from({length: 10}, (_, k) => ({at: 0.4 + k * 0.35, s: 'tick', v: 0.25})),
  {at: 6.1, s: 'sfx/swish', v: 0.5},
  {at: 7.2, s: 'deep-hit', v: 0.45},
  {at: 10.6, s: 'soft-whoosh', v: 0.5},
  ...SUPPORTS.flatMap(([, , , , at]) => [{at: at - 0.6, s: 'sfx/pop', v: 0.4}, {at, s: 'tampon', v: 0.55}]),
  ...Array.from({length: 8}, (_, k) => ({at: 17.4 + k * 0.32, s: 'sfx/click', v: 0.2})),
  {at: PEEL + 0.6, s: 'page', v: 0.7},
  {at: PEEL + 2.4, s: 'validation', v: 0.4},
  ...[ANG, EXT, INT, QUOI, VS].flatMap((at) => [{at: at - 0.45, s: 'sfx/swish', v: 0.5}, {at: at - 0.05, s: 'deep-hit', v: 0.35}]),
  {at: 33.8, s: 'sfx/pop', v: 0.4},
  {at: 37.0, s: 'tension', v: 0.25, dur: 2.4},
  {at: EXT + 2.2, s: 'page', v: 0.6},
  ...STAMPS.map(([, at]) => ({at, s: 'tampon', v: 0.6})),
  {at: 52.0, s: 'soft-whoosh', v: 0.5},
  {at: 53.0, s: 'cadenas', v: 0.5},
  {at: 55.4, s: 'validation', v: 0.45},
  {at: LANG, s: 'soft-whoosh', v: 0.45},
  ...Array.from({length: 14}, (_, k) => ({at: LANG + 1.2 + k * 0.22, s: 'sfx/click', v: 0.18})),
  {at: 63.6, s: 'sfx/ding', v: 0.35},
  {at: QUOTE, s: 'page', v: 0.5},
  {at: 68.9, s: 'sfx/pop', v: 0.4},
  {at: 71.2, s: 'sfx/pop', v: 0.4},
  {at: 76.3, s: 'riser', v: 0.25, dur: 1.2},
  {at: 76.6, s: 'stylo', v: 0.4, dur: 1.2},
  {at: 77.4, s: 'validation', v: 0.45},
  ...PARTS.map((_, k) => ({at: INT + 0.4 + k * 0.12, s: 'sfx/click', v: 0.25})),
  {at: 88.6, s: 'bass-hit', v: 0.45},
  {at: 92.2, s: 'soft-whoosh', v: 0.5},
  {at: 93.2, s: 'sfx/pop', v: 0.4},
  ...BENS.flatMap((b, i) => [...(i ? [{at: b.at - 0.4, s: 'soft-whoosh', v: 0.45}] : []), {at: b.at + 0.3, s: 'sfx/pop', v: 0.35}, {at: b.at + 2.2, s: 'tick', v: 0.45}]),
  ...[0, 1, 2, 3].map((k) => ({at: 118.8 + k * 0.08, s: 'sfx/whoosh', v: 0.25})),
  {at: 119.7, s: 'deep-hit', v: 0.45},
  {at: 120.4, s: 'sfx/ding', v: 0.3},
  {at: DEF + 0.2, s: 'page', v: 0.5},
  {at: 130.4, s: 'stylo', v: 0.45, dur: 1.0},
  {at: 138.4, s: 'stylo', v: 0.45, dur: 1.2},
  ...Array.from({length: 6}, (_, k) => ({at: 135.8 + k * 0.2, s: 'sfx/pop', v: 0.3})),
  ...Array.from({length: 10}, (_, k) => ({at: 140.3 + k * 0.32, s: 'tick', v: 0.3})),
  {at: 145.4, s: 'sfx/swish', v: 0.5},
  {at: 146.5, s: 'page', v: 0.5},
  ...[147.3, 147.8, 148.3].map((at) => ({at, s: 'tick', v: 0.4})),
  ...[149.3, 149.7, 150.1, 151.6, 152.0, 152.4].map((at) => ({at, s: 'sfx/pop', v: 0.35})),
  {at: 153.0, s: 'validation', v: 0.4},
  {at: VS + 4.0, s: 'sfx/whoosh', v: 0.5},
  {at: VS + 4.25, s: 'sfx/whoosh', v: 0.5},
  {at: VS + 4.6, s: 'bass-hit', v: 0.55},
  {at: 165.2, s: 'tampon', v: 0.65},
  {at: 168.1, s: 'tampon', v: 0.65},
  {at: 174.3, s: 'soft-whoosh', v: 0.45},
  ...Array.from({length: 12}, (_, k) => ({at: 174.6 + k * 0.25, s: 'sfx/click', v: 0.22})),
  {at: 178.7, s: 'deep-hit', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const CertifIso: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={LOGO_AT}><Coin /></Gate>
    <Gate from={10.6} to={ANG}><Stickers /></Gate>
    <Gate from={ANG} to={EXT}><XRay /></Gate>
    <Gate from={EXT} to={LANG}><Passport /></Gate>
    <Gate from={LANG} to={QUOTE}><Language /></Gate>
    <Gate from={QUOTE} to={INT}><Quote /></Gate>
    <Gate from={INT} to={BEN}><Exploded /></Gate>
    <Gate from={BEN} to={QUOI}><Carousel /></Gate>
    <Gate from={QUOI} to={DEF}><Why /></Gate>
    <Gate from={DEF} to={LOI}><Definition /></Gate>
    <Gate from={LOI} to={VS}><Recipe /></Gate>
    <Gate from={VS} to={OUTRO_AT}><Versus /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    {[ANG, EXT, INT, QUOI, VS].map((at) => <Blinds key={at} at={at} />)}
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-certif-iso-origine.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
