import {AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {easeIn, easeInOut, easeOut, prog} from '../anim';
import {colors, handFont, s, sansFont} from '../theme';
import {ShotKind, SHOTS, TURNS} from './plan';
import {SUBS} from './subs';

/**
 * Podcast « studio » multicaméra réalisé à partir des 4 images de référence :
 * cadrages (large, deux personnes, plan moyen, gros plan, amorce épaule, réaction)
 * pilotés par la détection des locuteurs, mouvements de caméra lents, audio original.
 */
export const INTRO = 3.0;
const OUTRO = 4.2;
const AUDIO_END = 914.6;
export const PODCAST_FRAMES = s(INTRO + AUDIO_END + OUTRO);
const LOGO = 'promo/logo.png';
const GOLD = '#E3A92B';

type Frame = {img: string; fx: number; fy: number; z: number};
const IMG_W = 2752;
const IMG_H = 1536;

/** Cadrages : image, point de visée normalisé, zoom (1 = image entière en « cover »). */
const FRAMING: Record<ShotKind | 'EMPTY', Frame> = {
  EMPTY: {img: 'studio-vide', fx: 0.5, fy: 0.5, z: 1.0},
  WIDE: {img: 'studio-duo', fx: 0.5, fy: 0.5, z: 1.0},
  TWO: {img: 'studio-duo', fx: 0.52, fy: 0.5, z: 1.2},
  F_MED: {img: 'studio-duo', fx: 0.27, fy: 0.5, z: 1.85},
  H_MED: {img: 'studio-duo', fx: 0.76, fy: 0.52, z: 1.85},
  F_OTS: {img: 'studio-duo', fx: 0.4, fy: 0.5, z: 1.45},
  H_OTS: {img: 'studio-duo', fx: 0.64, fy: 0.52, z: 1.45},
  F_REACT: {img: 'studio-duo', fx: 0.26, fy: 0.45, z: 2.15},
  H_REACT: {img: 'studio-duo', fx: 0.78, fy: 0.46, z: 2.15},
  F_CU: {img: 'femme', fx: 0.6, fy: 0.45, z: 1.04},
  H_CU: {img: 'homme', fx: 0.5, fy: 0.45, z: 1.04},
};

/** Pseudo-aléatoire déterministe par plan. */
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Rendu d'un cadrage avec mouvement de caméra lent + micro-flottement « épaule ». */
const Shot: React.FC<{f: Frame; p: number; i: number; W: number; H: number; zMul?: number}> = ({f, p, i, W, H, zMul = 1}) => {
  const frame = useCurrentFrame();
  const dir = rnd(i, 1) > 0.5 ? 1 : -1;
  const z = f.z * zMul * (1 + (0.035 + 0.03 * rnd(i, 2)) * (dir > 0 ? p : 1 - p));
  const panX = (rnd(i, 3) - 0.5) * 0.03 * (p - 0.5);
  const panY = (rnd(i, 4) - 0.5) * 0.015 * (p - 0.5);
  const base = Math.max(W / IMG_W, H / IMG_H) * z;
  const w = IMG_W * base;
  const h = IMG_H * base;
  let x = W / 2 - (f.fx + panX) * w;
  let y = H / 2 - (f.fy + panY) * h;
  x = Math.min(0, Math.max(W - w, x));
  y = Math.min(0, Math.max(H - h, y));
  const hx = Math.sin(frame / 41 + i) * 2.2 + Math.sin(frame / 17.3) * 0.8;
  const hy = Math.cos(frame / 37 + i) * 1.6;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <Img src={staticFile(`podcast/${f.img}-hd.jpg`)} style={{position: 'absolute', left: x + hx, top: y + hy, width: w, height: h, filter: 'contrast(1.04) saturate(1.04)'}} />
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, transparent 60%, rgba(8,10,18,0.45) 100%)'}} />
    </div>
  );
};

/** Plan courant à l'instant t (temps audio). */
const useShot = (ta: number) => {
  let idx = SHOTS.findIndex(([a, b]) => ta >= a && ta < b);
  if (idx < 0) idx = ta < 0 ? -1 : SHOTS.length - 1;
  return idx;
};

const speakerAt = (ta: number) => TURNS.find(([a, b]) => ta >= a && ta < b)?.[2];

/** Barres audio animées (indicateur de prise de parole). */
const Bars: React.FC<{color: string; n?: number; h?: number}> = ({color, n = 5, h = 34}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 4, height: h}}>
      {Array.from({length: n}).map((_, i) => (
        <div key={i} style={{width: 6, borderRadius: 3, background: color, height: h * (0.3 + 0.7 * Math.abs(Math.sin(frame / (3.1 + i * 0.7) + i * 1.7)))}} />
      ))}
    </div>
  );
};

/** Sous-titre courant. */
const Sub: React.FC<{ta: number; size: number; maxW: number}> = ({ta, size, maxW}) => {
  const cur = SUBS.find(([a, b]) => ta >= a && ta < b);
  if (!cur) return null;
  const o = Math.min(1, (ta - cur[0]) / 0.12);
  return (
    <div style={{maxWidth: maxW, background: 'rgba(10,16,30,0.72)', borderRadius: 14, padding: `${size * 0.25}px ${size * 0.6}px`, fontFamily: sansFont, fontWeight: 700, fontSize: size, color: '#fff', textAlign: 'center', lineHeight: 1.25, opacity: o, boxShadow: '0 8px 24px rgba(0,0,0,0.3)'}}>
      {cur[2]}
    </div>
  );
};

/** Intro et outro de marque. */
const Brand: React.FC<{t: number; at: number; dur: number; W: number; H: number; out?: boolean}> = ({t, at, dur, W, H, out}) => {
  const p = prog(t, at, at + dur, (v) => v);
  const inP = prog(t, at, at + 0.8, easeOut);
  const fade = out ? prog(t, at, at + 0.6, easeOut) : 1 - prog(t, at + dur - 0.6, at + dur, easeIn);
  const portrait = H > W;
  return (
    <AbsoluteFill style={{opacity: fade}}>
      <Shot f={FRAMING.EMPTY} p={p} i={out ? 999 : 0} W={W} H={H} zMul={portrait ? 1 : 1.04 + 0.08 * p} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,14,30,0.25), rgba(8,14,30,0.75))'}} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: portrait ? 40 : 26}}>
        <div style={{background: 'rgba(255,255,255,0.95)', borderRadius: 28, padding: portrait ? '28px 40px' : '20px 34px', transform: `scale(${0.9 + 0.1 * inP})`, opacity: inP, boxShadow: '0 20px 50px rgba(0,0,0,0.4)'}}>
          <Img src={staticFile(LOGO)} style={{width: portrait ? 640 : 520, display: 'block'}} />
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: portrait ? 44 : 34, color: '#fff', letterSpacing: 6, opacity: prog(t, at + 0.5, at + 1.1)}}>{out ? 'MERCI DE VOTRE ÉCOUTE' : 'LE DÉCRYPTAGE QHSE'}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: portrait ? 78 : 64, color: '#fff', textAlign: 'center', lineHeight: 1.05, padding: '0 60px', opacity: prog(t, at + 0.8, at + 1.4)}}>{out ? 'À très bientôt' : 'Les pièges de l\'ISO 9001:2026'}</div>
        <div style={{width: 260 * prog(t, at + 1.0, at + 1.8, easeInOut), height: 6, borderRadius: 3, background: colors.green}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Bandeau de marque discret (logo + titre de l'émission). */
const Bug: React.FC<{portrait?: boolean}> = ({portrait}) => (
  <div style={{position: 'absolute', left: portrait ? 40 : 40, top: portrait ? 60 : 34, display: 'flex', alignItems: 'center', gap: 18}}>
    <div style={{background: 'rgba(255,255,255,0.92)', borderRadius: 14, padding: '8px 14px', boxShadow: '0 6px 16px rgba(0,0,0,0.25)'}}>
      <Img src={staticFile(LOGO)} style={{width: portrait ? 300 : 230, display: 'block'}} />
    </div>
    <div style={{fontFamily: sansFont, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.6)'}}>
      <div style={{fontWeight: 800, fontSize: portrait ? 26 : 20, letterSpacing: 4, opacity: 0.9}}>LE DÉCRYPTAGE QHSE</div>
      <div style={{fontWeight: 900, fontSize: portrait ? 34 : 28}}>Les pièges de l'ISO 9001:2026</div>
    </div>
  </div>
);

/** Version principale 16:9. */
export const PodcastStudio: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const t = frame / 30;
  const ta = t - INTRO;
  const idx = useShot(ta);
  const inShow = ta >= 0 && ta < AUDIO_END;
  const sp = speakerAt(ta);
  let content: React.ReactNode = null;
  if (inShow && idx >= 0) {
    const [a, b, kind] = SHOTS[idx];
    const p = (ta - a) / Math.max(0.1, b - a);
    const fadeIn = kind === 'WIDE' && idx > 0 ? Math.min(1, (ta - a) / 0.3) : 1;
    content = (
      <>
        {fadeIn < 1 && <Shot f={FRAMING[SHOTS[idx - 1][2]]} p={1} i={idx - 1} W={W} H={H} />}
        <div style={{position: 'absolute', inset: 0, opacity: fadeIn}}><Shot f={FRAMING[kind]} p={p} i={idx} W={W} H={H} /></div>
      </>
    );
  }
  return (
    <AbsoluteFill style={{background: '#0B1220'}}>
      {content}
      {inShow && (
        <>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 180, background: 'linear-gradient(180deg, rgba(0,0,0,0.45), transparent)'}} />
          <Bug />
          {sp && (
            <div style={{position: 'absolute', bottom: 150, [sp === 'F' ? 'left' : 'right']: 60, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(10,16,30,0.6)', borderRadius: 40, padding: '10px 20px'} as React.CSSProperties}>
              <Bars color={sp === 'F' ? GOLD : '#7CC576'} />
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: 2}}>EN DIRECT DU STUDIO</div>
            </div>
          )}
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 56, display: 'flex', justifyContent: 'center'}}><Sub ta={ta} size={44} maxW={1500} /></div>
        </>
      )}
      {t < INTRO + 0.6 && <Brand t={t} at={0} dur={INTRO + 0.6} W={W} H={H} />}
      {ta >= AUDIO_END - 0.2 && <Brand t={t} at={INTRO + AUDIO_END - 0.2} dur={OUTRO + 0.2} W={W} H={H} out />}
      <Sequence from={s(INTRO)} layout="none"><Audio src={staticFile('voix-off-pieges-iso.m4a')} /></Sequence>
      <Sequence from={0} durationInFrames={s(2)} layout="none"><Audio src={staticFile('sfx2/soft-whoosh.wav')} volume={0.35} /></Sequence>
      <Sequence from={s(0.4)} durationInFrames={s(3)} layout="none"><Audio src={staticFile('sfx2/signature-marque.wav')} volume={0.45} /></Sequence>
      <Sequence from={s(INTRO + AUDIO_END)} durationInFrames={s(3.2)} layout="none"><Audio src={staticFile('sfx2/signature-marque.wav')} volume={0.45} /></Sequence>
    </AbsoluteFill>
  );
};

/** Cadrages verticaux (zoom plus serré, visées centrées sur les visages). */
const VFRAMING: Partial<Record<ShotKind, Frame>> = {
  F_CU: {img: 'femme', fx: 0.62, fy: 0.42, z: 1.0},
  H_CU: {img: 'homme', fx: 0.5, fy: 0.42, z: 1.0},
  F_MED: {img: 'studio-duo', fx: 0.26, fy: 0.48, z: 1.0},
  H_MED: {img: 'studio-duo', fx: 0.77, fy: 0.5, z: 1.0},
  F_OTS: {img: 'studio-duo', fx: 0.3, fy: 0.48, z: 1.0},
  H_OTS: {img: 'studio-duo', fx: 0.73, fy: 0.5, z: 1.0},
  F_REACT: {img: 'studio-duo', fx: 0.25, fy: 0.45, z: 1.15},
  H_REACT: {img: 'studio-duo', fx: 0.78, fy: 0.46, z: 1.15},
};

/** Version réseaux sociaux 9:16 : plan unique sur l'orateur, écran partagé quand les deux sont à l'image. */
export const PodcastVertical: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W} = useVideoConfig();
  const t = frame / 30;
  const ta = t - INTRO;
  const idx = useShot(ta);
  const inShow = ta >= 0 && ta < AUDIO_END;
  const sp = speakerAt(ta);
  const VH = 1180;
  let content: React.ReactNode = null;
  if (inShow && idx >= 0) {
    const [a, b, kind] = SHOTS[idx];
    const p = (ta - a) / Math.max(0.1, b - a);
    if (kind === 'WIDE' || kind === 'TWO') {
      content = (
        <>
          <div style={{position: 'absolute', left: 0, top: 0, width: W, height: VH / 2 - 4, overflow: 'hidden'}}>
            <Shot f={{img: 'studio-duo', fx: 0.27, fy: 0.46, z: 1.0}} p={p} i={idx} W={W} H={VH / 2 - 4} zMul={2.0} />
            {sp === 'F' && <div style={{position: 'absolute', inset: 0, border: `6px solid ${GOLD}`}} />}
          </div>
          <div style={{position: 'absolute', left: 0, top: VH / 2 + 4, width: W, height: VH / 2 - 4, overflow: 'hidden'}}>
            <Shot f={{img: 'studio-duo', fx: 0.77, fy: 0.48, z: 1.0}} p={p} i={idx + 50} W={W} H={VH / 2 - 4} zMul={2.0} />
            {sp === 'H' && <div style={{position: 'absolute', inset: 0, border: '6px solid #7CC576'}} />}
          </div>
        </>
      );
    } else {
      content = <Shot f={VFRAMING[kind] ?? FRAMING[kind]} p={p} i={idx} W={W} H={VH} />;
    }
  }
  return (
    <AbsoluteFill style={{background: '#0B1220'}}>
      {inShow && (
        <>
          <div style={{position: 'absolute', left: 0, top: 330, width: W, height: VH, overflow: 'hidden'}}>{content}</div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 330, background: 'linear-gradient(180deg, #0E2A5C, #0B1220)'}} />
          <Bug portrait />
          {sp && (
            <div style={{position: 'absolute', top: 250, left: 40, display: 'flex', alignItems: 'center', gap: 12}}>
              <Bars color={sp === 'F' ? GOLD : '#7CC576'} h={30} />
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: '#fff', letterSpacing: 3}}>EN DIRECT DU STUDIO</div>
            </div>
          )}
          <div style={{position: 'absolute', left: 0, right: 0, top: 330 + VH + 60, display: 'flex', justifyContent: 'center', padding: '0 40px'}}><Sub ta={ta} size={52} maxW={1000} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center', fontFamily: handFont, fontSize: 40, color: 'rgba(255,255,255,0.7)'}}>universnormes · Le décryptage QHSE</div>
        </>
      )}
      {t < INTRO + 0.6 && <Brand t={t} at={0} dur={INTRO + 0.6} W={W} H={1920} />}
      {ta >= AUDIO_END - 0.2 && <Brand t={t} at={INTRO + AUDIO_END - 0.2} dur={OUTRO + 0.2} W={W} H={1920} out />}
      <Sequence from={s(INTRO)} layout="none"><Audio src={staticFile('voix-off-pieges-iso.m4a')} /></Sequence>
      <Sequence from={0} durationInFrames={s(2)} layout="none"><Audio src={staticFile('sfx2/soft-whoosh.wav')} volume={0.35} /></Sequence>
      <Sequence from={s(0.4)} durationInFrames={s(3)} layout="none"><Audio src={staticFile('sfx2/signature-marque.wav')} volume={0.45} /></Sequence>
      <Sequence from={s(INTRO + AUDIO_END)} durationInFrames={s(3.2)} layout="none"><Audio src={staticFile('sfx2/signature-marque.wav')} volume={0.45} /></Sequence>
    </AbsoluteFill>
  );
};

