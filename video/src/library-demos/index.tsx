import React from 'react';
import {Composition} from 'remotion';
import {FPS} from '../theme';
import {Window} from './Window';
import {LangageDg} from '../langageDg/LangageDg';
import {AccueilSecu} from '../accueilSecu/AccueilSecu';

// Aperçus de la librairie (library/<section>/<slug>/index.md → demo: Demo-<Slug>).
const s = (sec: number) => Math.round(sec * FPS);
const DEMOS: {id: string; C: React.FC; at: number; dur: number}[] = [
  {id: 'Demo-CapsuleMetroCondense', C: LangageDg, at: 0, dur: 8},
  {id: 'Demo-CouvertureLettresPhoto', C: LangageDg, at: 0, dur: 2.8},
  {id: 'Demo-TransitionGyrophare', C: LangageDg, at: 2.4, dur: 4},
  {id: 'Demo-TransitionLoupe', C: LangageDg, at: 101.9, dur: 4},
  {id: 'Demo-TransitionPneumatique', C: LangageDg, at: 153.1, dur: 4},
  {id: 'Demo-TransitionStoreVenitien', C: AccueilSecu, at: 150.9, dur: 4},
  {id: 'Demo-BarreRechercheOuvre', C: LangageDg, at: 156.8, dur: 5},
  {id: 'Demo-MetroStations', C: LangageDg, at: 14.4, dur: 4},
  {id: 'Demo-SousTitresPapierMotAMot', C: LangageDg, at: 19.5, dur: 5},
];

export const LibraryDemos: React.FC = () => (
  <>
    {DEMOS.map(({id, C, at, dur}) => (
      <Composition key={id} id={id} component={() => <Window start={s(at)}><C /></Window>} durationInFrames={s(dur)} fps={FPS} width={1080} height={1920} />
    ))}
  </>
);
