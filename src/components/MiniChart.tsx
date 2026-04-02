import { useId } from 'react';
import { useThemeColors } from '../hooks/useThemeColors';

type Accent = 'nav' | 'status' | 'measure' | 'action';

function hexToGlow(hex: string, alpha = 0.15): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function SparkLine({ data, color, width = 120, height = 36 }: {
  data: number[];
  color: Accent;
  width?: number;
  height?: number;
}) {
  const colors = useThemeColors();
  const c = colors[color];
  const gradId = useId();

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padY = 2;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - padY - ((v - min) / range) * (height - padY * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="sparkline">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0.25" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DonutChart({ value, label, color, size = 80 }: {
  value: number;
  label: string;
  color: Accent;
  size?: number;
}) {
  const colors = useThemeColors();
  const c = colors[color];
  const glow = hexToGlow(c);

  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="donut-chart" style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--surface-4)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            filter: `drop-shadow(0 0 4px ${glow})`,
            transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s ease',
          }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-data)',
          fontSize: 16,
          fontWeight: 600,
          color: c,
          transition: 'color 0.3s ease',
        }}>{value}%</span>
        <span style={{
          fontSize: 9,
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 600,
        }}>{label}</span>
      </div>
    </div>
  );
}

export function BarChart({ data, color }: {
  data: { label: string; value: number }[];
  color: Accent;
}) {
  const colors = useThemeColors();
  const c = colors[color];
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <div key={i} className="bar-row">
          <span className="bar-label">{d.label}</span>
          <div className="bar-track">
            <div
              className={`bar-fill bar-fill--${color}`}
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="bar-value" style={{ color: c, transition: 'color 0.3s ease' }}>{d.value}</span>
        </div>
      ))}
    </div>
  );
}
