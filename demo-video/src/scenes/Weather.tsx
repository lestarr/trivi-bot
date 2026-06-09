import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME } from '../theme';
import { AppMock, typedSlice } from '../components/AppMock';

const TYPE_START = 100;

export const Weather: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const captionIn = interpolate(frame, [5, 30], [0, 1], { extrapolateRight: 'clamp' });
  const captionOut = interpolate(frame, [70, 95], [1, 0], { extrapolateRight: 'clamp' });
  const captionOpacity = captionIn * captionOut;

  const cmd = 'w London tomorrow';
  const typed = typedSlice(cmd, frame, TYPE_START, 0.6);
  const showCursor = Math.floor(frame / 18) % 2 === 0 && typed.length < cmd.length;

  const responseStart = TYPE_START + 50;
  const responseAppear = frame > responseStart ? frame - responseStart : 0;
  const responseScale = spring({ frame: responseAppear, fps, from: 0.85, to: 1, config: { damping: 14, stiffness: 110 } });
  const responseOpacity = interpolate(frame, [responseStart, responseStart + 25], [0, 1], { extrapolateRight: 'clamp' });

  const sceneFade = interpolate(frame, [340, 360], [1, 0], { extrapolateRight: 'clamp' });

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
          Або <code style={{ background: THEME.cardAlt, padding: '4px 16px', borderRadius: 8, color: THEME.green }}>w</code> — погода на завтра.
        </span>
      </div>

      <div style={{ paddingTop: 180 }}>
        <AppMock
          inputText={typed}
          showCursor={showCursor}
          modeBadge={typed.startsWith('w') ? 'Weather' : ''}
          responseScale={responseScale}
          responseOpacity={responseOpacity}
        >
          {frame > responseStart && (
            <div style={{ fontSize: 26, lineHeight: 1.6 }}>
              <div style={{ fontSize: 30, color: THEME.green, marginBottom: 14 }}>
                London, UK · Tomorrow
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>
                <span style={{ fontSize: 56 }}>⛅</span>
                <div>
                  <div style={{ fontSize: 36, fontWeight: 600 }}>14°C / 7°C</div>
                  <div style={{ fontSize: 22, color: THEME.textDim }}>Partly cloudy, light showers in the afternoon</div>
                </div>
              </div>
              <div style={{ fontSize: 22, color: THEME.textDim }}>
                Wind: 18 km/h SW · Rain: 40% · Sunrise 06:42 · Sunset 19:08
              </div>
            </div>
          )}
        </AppMock>
      </div>
    </AbsoluteFill>
  );
};
