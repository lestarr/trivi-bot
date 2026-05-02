import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME } from '../theme';
import { AppMock, typedSlice } from '../components/AppMock';

const TYPE_START = 100;

export const Explain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const captionIn = interpolate(frame, [5, 30], [0, 1], { extrapolateRight: 'clamp' });
  const captionOut = interpolate(frame, [70, 95], [1, 0], { extrapolateRight: 'clamp' });
  const captionOpacity = captionIn * captionOut;

  const word = 'e kubernetes';
  const typed = typedSlice(word, frame, TYPE_START, 0.5);
  const showCursor = Math.floor(frame / 18) % 2 === 0 && typed.length < word.length;

  const responseStart = TYPE_START + 60;
  const responseAppear = frame > responseStart ? frame - responseStart : 0;
  const responseScale = spring({ frame: responseAppear, fps, from: 0.85, to: 1, config: { damping: 14, stiffness: 110 } });
  const responseOpacity = interpolate(frame, [responseStart, responseStart + 25], [0, 1], { extrapolateRight: 'clamp' });

  const explainText =
    'Kubernetes is an open-source platform that automates deploying, scaling, and managing containerized applications. It groups containers into logical units for easy management and discovery.';
  const explainTyped = typedSlice(explainText, frame, responseStart + 30, 1.6);

  const sceneFade = interpolate(frame, [370, 390], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        fontFamily: THEME.font,
        opacity: sceneFade,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0, right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          color: THEME.text,
          opacity: captionOpacity,
          fontWeight: 500,
          textAlign: 'center',
          padding: '0 120px',
          pointerEvents: 'none',
        }}
      >
        <span>
          Prefix <code style={{ background: THEME.cardAlt, padding: '4px 16px', borderRadius: 8, color: THEME.green }}>e</code> for instant explanations.
        </span>
      </div>

      <div style={{ paddingTop: 180 }}>
        <AppMock
          inputText={typed}
          showCursor={showCursor}
          modeBadge={typed.startsWith('e') ? 'Explain' : ''}
          responseScale={responseScale}
          responseOpacity={responseOpacity}
        >
          {frame > responseStart && (
            <div style={{ fontSize: 26, lineHeight: 1.6 }}>
              {explainTyped}
              {explainTyped.length < explainText.length && (
                <span style={{ color: THEME.accent }}>▌</span>
              )}
            </div>
          )}
        </AppMock>
      </div>
    </AbsoluteFill>
  );
};
