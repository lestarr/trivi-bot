import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { THEME } from '../theme';
import { AppMock, typedSlice } from '../components/AppMock';

const SettingsPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelScale = spring({ frame, fps, from: 0.9, to: 1, config: { damping: 14, stiffness: 110 } });
  const panelOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const prefix = typedSlice('s', frame, 30, 0.4);
  const label = typedSlice('Summary', frame, 50, 0.5);
  const prompt = typedSlice('Summarize the following text in 3 bullet points.', frame, 90, 1.4);

  const saveFlash = interpolate(frame, [220, 235, 270], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const saveScale = interpolate(frame, [220, 235], [1, 1.06], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        background: THEME.card,
        borderRadius: 18,
        padding: 40,
        width: 1100,
        margin: '0 auto',
        opacity: panelOpacity,
        transform: `scale(${panelScale})`,
        fontFamily: THEME.font,
      }}
    >
      <div style={{ fontSize: 18, color: THEME.textDim, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>
        Commands
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '110px 200px 1fr', gap: 14, alignItems: 'start' }}>
        <Field label="Prefix" value={prefix} small />
        <Field label="Label" value={label} small />
        <Field label="Prompt" value={prompt} multi />
      </div>
      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          style={{
            background: THEME.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 28px',
            fontSize: 22,
            fontWeight: 600,
            transform: `scale(${saveScale})`,
            boxShadow: `0 0 ${saveFlash * 30}px ${saveFlash * 8}px ${THEME.green}`,
          }}
        >
          Save
        </button>
        <span style={{ color: THEME.green, fontSize: 20, opacity: saveFlash }}>Saved ✓</span>
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; value: string; small?: boolean; multi?: boolean }> = ({
  label,
  value,
  small,
  multi,
}) => (
  <div>
    <div style={{ fontSize: 16, color: THEME.textDim, marginBottom: 6 }}>{label}</div>
    <div
      style={{
        background: THEME.bg,
        border: `2px solid ${THEME.border}`,
        borderRadius: 8,
        padding: '12px 14px',
        fontSize: small ? 22 : 20,
        color: THEME.text,
        minHeight: multi ? 70 : 50,
        fontFamily: THEME.font,
      }}
    >
      {value}
    </div>
  </div>
);

const InputDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cmd = 's Climate change is the long-term shift in temperatures and weather patterns...';
  const typed = typedSlice(cmd, frame, 10, 1.3);
  const showCursor = Math.floor(frame / 18) % 2 === 0 && typed.length < cmd.length;

  const responseStart = 90;
  const responseAppear = frame > responseStart ? frame - responseStart : 0;
  const responseScale = spring({ frame: responseAppear, fps, from: 0.85, to: 1, config: { damping: 14, stiffness: 110 } });
  const responseOpacity = interpolate(frame, [responseStart, responseStart + 25], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ paddingTop: 100, fontFamily: THEME.font }}>
      <AppMock
        inputText={typed}
        showCursor={showCursor}
        modeBadge={typed.startsWith('s') ? 'Summary' : ''}
        responseScale={responseScale}
        responseOpacity={responseOpacity}
      >
        {frame > responseStart && (
          <ul style={{ fontSize: 24, lineHeight: 1.7, paddingLeft: 28, listStyle: 'none' }}>
            <li>• Long-term shifts in global temperatures, primarily driven by human activity since the 1800s.</li>
            <li>• Burning fossil fuels releases greenhouse gases that trap heat in Earth's atmosphere.</li>
            <li>• Effects include rising sea levels, extreme weather, and ecosystem disruption.</li>
          </ul>
        )}
      </AppMock>
    </div>
  );
};

// Layout:
// 0-90:    caption "Add your own commands in seconds"
// 90-380:  settings panel (~9.7s, save flash mid-way)
// 380-680: input demo + result held longer (10s)
export const AddCommand: React.FC = () => {
  const frame = useCurrentFrame();
  const captionIn = interpolate(frame, [5, 30], [0, 1], { extrapolateRight: 'clamp' });
  const captionOut = interpolate(frame, [70, 95], [1, 0], { extrapolateRight: 'clamp' });
  const captionOpacity = captionIn * captionOut;

  const sceneFade = interpolate(frame, [560, 580], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        fontFamily: THEME.font,
        opacity: sceneFade,
      }}
    >
      {/* Caption first */}
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
        Add your own commands in seconds.
      </div>

      <Sequence from={90} durationInFrames={290} layout="none">
        <AbsoluteFill style={{ paddingTop: 200 }}>
          <SettingsPanel />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={380} layout="none">
        <AbsoluteFill>
          <InputDemo />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
