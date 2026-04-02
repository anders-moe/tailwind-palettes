import { StatCard, Card } from '../components/Card';
import { DataTable, StatusBadge, ProgressBar } from '../components/DataTable';
import { BarChart, SparkLine } from '../components/MiniChart';

const wellTable = [
  { name: 'NO 34/2-1', field: 'Snorre', depth: '4,218 m', status: <StatusBadge status="Active" color="status" />, completion: <ProgressBar value={87} color="status" />, logs: '12' },
  { name: 'NO 15/9-F-4', field: 'Sleipner', depth: '3,102 m', status: <StatusBadge status="Active" color="status" />, completion: <ProgressBar value={100} color="status" />, logs: '24' },
  { name: 'NO 31/2-21 S', field: 'Troll', depth: '1,567 m', status: <StatusBadge status="Suspended" color="measure" />, completion: <ProgressBar value={62} color="measure" />, logs: '8' },
  { name: 'NO 6407/7-A-3', field: 'Heidrun', depth: '2,890 m', status: <StatusBadge status="P&A" color="action" />, completion: <ProgressBar value={100} color="action" />, logs: '18' },
  { name: 'NO 25/4-10', field: 'Balder', depth: '3,455 m', status: <StatusBadge status="Active" color="status" />, completion: <ProgressBar value={45} color="nav" />, logs: '6' },
  { name: 'NO 7121/4-1', field: 'Wisting', depth: '716 m', status: <StatusBadge status="Exploration" color="nav" />, completion: <ProgressBar value={28} color="nav" />, logs: '3' },
];

const formationData = [
  { label: 'Utsira', value: 342 },
  { label: 'Draupne', value: 218 },
  { label: 'Brent', value: 185 },
  { label: 'Statfjord', value: 156 },
  { label: 'Cook', value: 98 },
];

export function WellData() {
  return (
    <div className="section-content">
      <div className="section-header">
        <h1 className="section-title" style={{ color: 'var(--status)' }}>Well Data</h1>
        <p className="section-subtitle">Well inventory, logs, and formation data</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Wells" value="2,841" accent="status" />
        <StatCard label="Active" value="1,204" accent="status" change="42%" changeDir="up" />
        <StatCard label="Avg Depth" value="2,743" unit="m" accent="measure" />
        <StatCard label="Logs Processed" value="18.4" unit="K" accent="nav" change="+340 today" changeDir="up" />
      </div>

      <Card accent="status">
        <div className="card-title">Well Inventory</div>
        <DataTable
          accent="status"
          columns={[
            { key: 'name', label: 'Well ID', mono: true },
            { key: 'field', label: 'Field' },
            { key: 'depth', label: 'TD', align: 'right', mono: true },
            { key: 'status', label: 'Status' },
            { key: 'completion', label: 'Completion' },
            { key: 'logs', label: 'Logs', align: 'right', mono: true },
          ]}
          rows={wellTable}
        />
      </Card>

      <div className="two-col">
        <Card accent="measure" className="flex-1">
          <div className="card-title">Formations (Well Count)</div>
          <BarChart data={formationData} color="measure" />
        </Card>
        <Card accent="nav" className="flex-1">
          <div className="card-title">Log Processing Rate</div>
          <div style={{ padding: '12px 0' }}>
            <SparkLine data={[120,135,128,142,155,148,162,170,165,178,190,185]} color="nav" width={300} height={60} />
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
            <div>
              <div className="stat-label" style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Today</div>
              <div style={{ fontFamily: 'var(--font-data)', color: 'var(--nav)', fontSize: 18, fontWeight: 600 }}>340</div>
            </div>
            <div>
              <div className="stat-label" style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>7-Day Avg</div>
              <div style={{ fontFamily: 'var(--font-data)', color: 'var(--text-secondary)', fontSize: 18, fontWeight: 600 }}>285</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
