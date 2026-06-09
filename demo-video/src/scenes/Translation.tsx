import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME } from '../theme';
import { AppMock, typedSlice } from '../components/AppMock';

const TYPE_START = 100;

export const Translation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const captionIn = interpolate(frame, [5, 30], [0, 1], { extrapolateRight: 'clamp' });
  const captionOut = interpolate(frame, [70, 95], [1, 0], { extrapolateRight: 'clamp' });
  const captionOpacity = captionIn * captionOut;

  const word = 'deployment';
  const typed = typedSlice(word, frame, TYPE_START, 0.5);
  const showCursor = Math.floor(frame / 18) % 2 === 0 && typed.length < word.length;

  const responseStart = TYPE_START + 50;
  const responseAppear = frame > responseStart ? frame - responseStart : 0;
  const responseScale = spring({ frame: responseAppear, fps, from: 0.85, to: 1, config: { damping: 14, stiffness: 110 } });
  const responseOpacity = interpolate(frame, [responseStart, responseStart + 25], [0, 1], { extrapolateRight: 'clamp' });

  const sceneFade = interpolate(frame, [245, 265], [1, 0], { extrapolateRight: 'clamp' });

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
        Введіть будь-яке слово — отримайте переклад із прикладами вживання.
      </div>

      <div style={{ paddingTop: 180 }}>
        <AppMock
          inputText={typed}
          showCursor={showCursor}
          modeBadge={typed ? 'Translation' : ''}
          responseScale={responseScale}
          responseOpacity={responseOpacity}
        >
          {frame > responseStart && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div>
                <div style={{ fontSize: 28, color: THEME.green, marginBottom: 6 }}>
                  🇩🇪 Deutsch
                </div>
                <div style={{ fontSize: 26 }}>
                  <b>die Bereitstellung</b> · <b>der Einsatz</b>
                </div>
                <div style={{ fontSize: 20, color: THEME.textDim, marginTop: 6, fontStyle: 'italic' }}>
                  "Die Bereitstellung der neuen Version war erfolgreich."
                </div>
              </div>
              <div>
                <div style={{ fontSize: 28, color: THEME.green, marginBottom: 6 }}>
                  🇺🇦 Українська
                </div>
                <div style={{ fontSize: 26 }}>
                  <b>розгортання</b> · <b>впровадження</b>
                </div>
                <div style={{ fontSize: 20, color: THEME.textDim, marginTop: 6, fontStyle: 'italic' }}>
                  "Розгортання нової версії пройшло успішно."
                </div>
              </div>
            </div>
          )}
        </AppMock>
      </div>
    </AbsoluteFill>
  );
};
