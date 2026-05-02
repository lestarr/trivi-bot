import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { THEME } from './theme';
import { Intro } from './scenes/Intro';
import { Translation } from './scenes/Translation';
import { Explain } from './scenes/Explain';
import { SettingsIntro } from './scenes/SettingsIntro';
import { AddCommand } from './scenes/AddCommand';
import { Weather } from './scenes/Weather';
import { Outro } from './scenes/Outro';

const T = 20; // crossfade duration in frames (~0.67s)

export const TriviDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={150}>
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={265}>
          <Translation />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={390}>
          <Explain />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={150}>
          <SettingsIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={580}>
          <AddCommand />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={360}>
          <Weather />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={240}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
