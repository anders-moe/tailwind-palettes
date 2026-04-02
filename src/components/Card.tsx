import type { ReactNode } from 'react';

type Accent = 'nav' | 'status' | 'measure' | 'action';

export function Card({ children, className = '', accent }: {
  children: ReactNode;
  className?: string;
  accent?: Accent;
}) {
  return (
    <div className={`card ${accent ? `card--${accent}` : ''} ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, unit, change, changeDir, accent }: {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  changeDir?: 'up' | 'down';
  accent: Accent;
}) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {value}
        {unit && <span className="stat-unit">{unit}</span>}
      </div>
      {change && (
        <div className={`stat-change stat-change--${changeDir}`}>
          {changeDir === 'up' ? '\u25B2' : '\u25BC'} {change}
        </div>
      )}
    </div>
  );
}
