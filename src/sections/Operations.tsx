import { StatCard, Card } from '../components/Card';
import { DataTable, StatusBadge } from '../components/DataTable';
import { SparkLine, DonutChart } from '../components/MiniChart';

const alertsTable = [
  { severity: <StatusBadge status="Critical" color="action" />, message: 'Storage node NAS-07 disk utilization > 95%', time: '12 min ago', assigned: 'Ops Team' },
  { severity: <StatusBadge status="Critical" color="action" />, message: 'Job JOB-4818 failed: Inversion timeout on Ekofisk merge', time: '3 hr ago', assigned: 'Processing' },
  { severity: <StatusBadge status="Warning" color="measure" />, message: 'Seismic ingestion rate below threshold (< 50 MB/s)', time: '1 hr ago', assigned: 'Data Mgmt' },
  { severity: <StatusBadge status="Warning" color="measure" />, message: 'License server response time > 2s', time: '2 hr ago', assigned: 'IT Support' },
  { severity: <StatusBadge status="Info" color="nav" />, message: 'Scheduled maintenance window: Sun 02:00-06:00 UTC', time: '6 hr ago', assigned: 'System' },
];

const auditLog = [
  { action: 'Export', user: 'erik.h', target: 'NS-34 Velocity Model', time: '09:45', result: <StatusBadge status="OK" color="status" /> },
  { action: 'Delete', user: 'maria.s', target: 'Test dataset XYZ', time: '09:22', result: <StatusBadge status="OK" color="status" /> },
  { action: 'Import', user: 'anders.m', target: 'Barents 2D SEG-Y (14 files)', time: '08:58', result: <StatusBadge status="OK" color="status" /> },
  { action: 'Permission', user: 'admin', target: 'Granted write: troll-project', time: '08:30', result: <StatusBadge status="Elevated" color="action" /> },
  { action: 'Login', user: 'kari.n', target: 'Web client', time: '08:15', result: <StatusBadge status="OK" color="status" /> },
];

export function Operations() {
  return (
    <div className="section-content">
      <div className="section-header">
        <h1 className="section-title" style={{ color: 'var(--action)' }}>Operations</h1>
        <p className="section-subtitle">Alerts, system health, and audit trail</p>
      </div>

      <div className="stat-grid">
        <StatCard label="System Uptime" value="99.97" unit="%" accent="status" />
        <StatCard label="Active Users" value="34" accent="nav" change="+8 today" changeDir="up" />
        <StatCard label="Ingestion Rate" value="142" unit="MB/s" accent="measure" />
        <StatCard label="Open Alerts" value="5" accent="action" change="2 critical" changeDir="up" />
      </div>

      <Card accent="action">
        <div className="card-title">Active Alerts</div>
        <DataTable
          accent="action"
          columns={[
            { key: 'severity', label: 'Severity' },
            { key: 'message', label: 'Message' },
            { key: 'time', label: 'Time', mono: true },
            { key: 'assigned', label: 'Assigned' },
          ]}
          rows={alertsTable}
        />
      </Card>

      <div className="two-col">
        <Card accent="status" className="flex-1">
          <div className="card-title">System Health</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
            <DonutChart value={99} label="API" color="status" size={72} />
            <DonutChart value={95} label="DB" color="nav" size={72} />
            <DonutChart value={87} label="Storage" color="measure" size={72} />
            <DonutChart value={72} label="Compute" color="action" size={72} />
          </div>
        </Card>

        <Card accent="nav" className="flex-1">
          <div className="card-title">User Sessions (24h)</div>
          <div style={{ padding: '8px 0' }}>
            <SparkLine data={[18,22,20,28,35,42,48,52,45,38,34,30,28,24,34,40,38,35,30,26,22,18,15,12]} color="nav" width={300} height={60} />
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 4 }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Peak</div>
              <div style={{ fontFamily: 'var(--font-data)', color: 'var(--nav)', fontSize: 18, fontWeight: 600 }}>52</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Current</div>
              <div style={{ fontFamily: 'var(--font-data)', color: 'var(--text-secondary)', fontSize: 18, fontWeight: 600 }}>34</div>
            </div>
          </div>
        </Card>
      </div>

      <Card accent="measure">
        <div className="card-title">Audit Log</div>
        <DataTable
          accent="measure"
          columns={[
            { key: 'action', label: 'Action' },
            { key: 'user', label: 'User', mono: true },
            { key: 'target', label: 'Target' },
            { key: 'time', label: 'Time', mono: true },
            { key: 'result', label: 'Result' },
          ]}
          rows={auditLog}
        />
      </Card>
    </div>
  );
}
