import { Layers, Globe, Database, BarChart3, AlertTriangle } from 'lucide-react';

const sections = [
  { id: 'overview', label: 'Overview', icon: Globe, color: 'nav' },
  { id: 'wells', label: 'Well Data', icon: Database, color: 'status' },
  { id: 'analysis', label: 'Analysis', icon: BarChart3, color: 'measure' },
  { id: 'operations', label: 'Operations', icon: AlertTriangle, color: 'action' },
] as const;

interface Props {
  active: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ active, onNavigate }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Layers size={20} strokeWidth={2.5} />
        <span>GeoData</span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group-label">Sections</div>
        {sections.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            className={`nav-item nav-item--${color} ${active === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <span className="nav-icon"><Icon size={17} /></span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" />
        <span>Connected</span>
      </div>
    </aside>
  );
}
