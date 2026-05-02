import React from 'react';
import { Composition } from 'remotion';
import { TriviDemo } from './TriviDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TriviDemo"
      component={TriviDemo}
      durationInFrames={2015}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
