import { useState } from 'react';
import { StatCard, Card } from '../components/Card';
import { DataTable, StatusBadge } from '../components/DataTable';
import { BarChart, DonutChart } from '../components/MiniChart';

const jobsTable = [
  { id: 'JOB-4821', type: <StatusBadge status="Velocity Model" color="measure" />, dataset: 'NS Block 34 3D', started: '09:14', runtime: '2h 18m', status: <StatusBadge status="Running" color="status" /> },
  { id: 'JOB-4820', type: <StatusBadge status="Depth Conv." color="nav" />, dataset: 'Barents 2D Lines', started: '08:42', runtime: '3h 06m', status: <StatusBadge status="Running" color="status" /> },
  { id: 'JOB-4819', type: <StatusBadge status="AVO Analysis" color="measure" />, dataset: 'Troll Reprocess', started: '07:30', runtime: '4h 22m', status: <StatusBadge status="Complete" color="status" /> },
  { id: 'JOB-4818', type: <StatusBadge status="Inversion" color="action" />, dataset: 'Ekofisk 3D Merge', started: 'Yesterday', runtime: '18h 44m', status: <StatusBadge status="Failed" color="action" /> },
  { id: 'JOB-4817', type: <StatusBadge status="Migration" color="nav" />, dataset: 'Haltenbanken Grid', started: 'Yesterday', runtime: '6h 12m', status: <StatusBadge status="Complete" color="status" /> },
];

const gpuUsage = [
  { label: 'Node A', value: 92 },
  { label: 'Node B', value: 78 },
  { label: 'Node C', value: 65 },
  { label: 'Node D', value: 41 },
];

const tabs = ['Jobs', 'Resources', 'Results'] as const;

export function Analysis() {
  const [tab, setTab] = useState<typeof tabs[number]>('Jobs');

  return (
    <div className="section-content">
      <div className="section-header">
        <h1 className="section-title" style={{ color: 'var(--measure)' }}>Analysis</h1>
        <p className="section-subtitle">Processing jobs, compute resources, and results</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Active Jobs" value="14" accent="measure" />
        <StatCard label="Queue Depth" value="38" accent="nav" change="-5 from peak" changeDir="down" />
        <StatCard label="GPU Utilization" value="69" unit="%" accent="status" change="Nominal" changeDir="up" />
        <StatCard label="Failed (24h)" value="3" accent="action" change="+1 today" changeDir="up" />
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        {tabs.map(t => (
          <button
            key={t}
            className={`tab-btn tab-btn--measure ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Jobs' && (
        <Card accent="measure">
          <div className="card-title">Processing Queue</div>
          <DataTable
            accent="measure"
            columns={[
              { key: 'id', label: 'Job ID', mono: true },
              { key: 'type', label: 'Type' },
              { key: 'dataset', label: 'Dataset' },
              { key: 'started', label: 'Started', mono: true },
              { key: 'runtime', label: 'Runtime', mono: true, align: 'right' },
              { key: 'status', label: 'Status' },
            ]}
            rows={jobsTable}
          />
        </Card>
      )}

      {tab === 'Resources' && (
        <div className="two-col">
          <Card accent="status" className="flex-1">
            <div className="card-title">GPU Load per Node</div>
            <BarChart data={gpuUsage} color="status" />
          </Card>
          <Card accent="measure" className="flex-1">
            <div className="card-title">Resource Allocation</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
              <DonutChart value={69} label="GPU" color="status" />
              <DonutChart value={54} label="CPU" color="nav" />
              <DonutChart value={82} label="Storage" color="measure" />
              <DonutChart value={23} label="Network" color="action" />
            </div>
          </Card>
        </div>
      )}

      {tab === 'Results' && (
        <Card accent="nav">
          <div className="card-title">Recent Results</div>
          <div className="results-grid">
            {['Velocity Model v3.2', 'Depth Conversion NS-34', 'AVO Anomaly Map', 'PSTM Volume'].map((name, i) => {
              const colors: Array<'nav'|'status'|'measure'|'action'> = ['nav', 'status', 'measure', 'action'];
              const c = colors[i % 4];
              return (
                <div key={i} className={`result-card result-card--${c}`}>
                  <div className="result-name">{name}</div>
                  <div className="result-meta">
                    <span>{['2.4 GB', '890 MB', '1.1 GB', '4.8 GB'][i]}</span>
                    <StatusBadge status="Ready" color={c} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
