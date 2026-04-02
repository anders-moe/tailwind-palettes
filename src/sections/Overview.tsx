import { StatCard, Card } from '../components/Card';
import { SparkLine, DonutChart } from '../components/MiniChart';
import { DataTable, StatusBadge } from '../components/DataTable';

const sparkData = {
  seismic: [12, 18, 14, 22, 19, 28, 25, 32, 29, 35, 31, 38],
  wells: [5, 8, 6, 12, 9, 15, 18, 14, 20, 17, 22, 25],
  storage: [60, 62, 61, 65, 68, 70, 72, 71, 74, 78, 80, 82],
  alerts: [3, 1, 4, 2, 5, 3, 2, 6, 4, 3, 7, 5],
};

const recentActivity = [
  { project: 'North Sea Block 34', type: <StatusBadge status="Seismic" color="nav" />, updated: '2 min ago', status: <StatusBadge status="Active" color="status" /> },
  { project: 'Barents Survey #12', type: <StatusBadge status="Well Log" color="status" />, updated: '18 min ago', status: <StatusBadge status="Processing" color="measure" /> },
  { project: 'Haltenbanken Grid', type: <StatusBadge status="Gravity" color="measure" />, updated: '1 hr ago', status: <StatusBadge status="Active" color="status" /> },
  { project: 'Troll Field Update', type: <StatusBadge status="Seismic" color="nav" />, updated: '3 hr ago', status: <StatusBadge status="Review" color="action" /> },
  { project: 'Ekofisk Reprocess', type: <StatusBadge status="Seismic" color="nav" />, updated: '5 hr ago', status: <StatusBadge status="Complete" color="status" /> },
];

export function Overview() {
  return (
    <div className="section-content">
      <div className="section-header">
        <h1 className="section-title">Overview</h1>
        <p className="section-subtitle">Platform summary and recent activity</p>
      </div>

      {/* Stat cards row */}
      <div className="stat-grid">
        <div>
          <StatCard label="Active Surveys" value="147" accent="nav" change="+12 this week" changeDir="up" />
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
            <SparkLine data={sparkData.seismic} color="nav" />
          </div>
        </div>
        <div>
          <StatCard label="Well Records" value="2,841" accent="status" change="+86 this month" changeDir="up" />
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
            <SparkLine data={sparkData.wells} color="status" />
          </div>
        </div>
        <div>
          <StatCard label="Storage Used" value="82" unit="TB" accent="measure" change="4.2 TB remaining" changeDir="down" />
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
            <SparkLine data={sparkData.storage} color="measure" />
          </div>
        </div>
        <div>
          <StatCard label="Open Alerts" value="5" accent="action" change="+2 today" changeDir="up" />
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
            <SparkLine data={sparkData.alerts} color="action" />
          </div>
        </div>
      </div>

      {/* Middle row: donuts + table */}
      <div className="two-col">
        <Card accent="nav" className="flex-1">
          <div className="card-title">Data Coverage</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0 4px' }}>
            <DonutChart value={78} label="Seismic" color="nav" />
            <DonutChart value={92} label="Wells" color="status" />
            <DonutChart value={45} label="Gravity" color="measure" />
            <DonutChart value={63} label="Mag" color="action" />
          </div>
        </Card>

        <Card accent="status" className="flex-2">
          <div className="card-title">Recent Activity</div>
          <DataTable
            accent="status"
            columns={[
              { key: 'project', label: 'Project' },
              { key: 'type', label: 'Type' },
              { key: 'updated', label: 'Updated', mono: true },
              { key: 'status', label: 'Status' },
            ]}
            rows={recentActivity}
          />
        </Card>
      </div>
    </div>
  );
}
