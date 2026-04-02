type Accent = 'nav' | 'status' | 'measure' | 'action';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  mono?: boolean;
}

interface Props {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  accent?: Accent;
}

export function DataTable({ columns, rows, accent = 'nav' }: Props) {
  return (
    <div className={`data-table-wrap data-table--${accent}`}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ textAlign: col.align ?? 'left' }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td
                  key={col.key}
                  style={{ textAlign: col.align ?? 'left' }}
                  className={col.mono ? 'mono' : ''}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ status, color }: { status: string; color: Accent }) {
  return <span className={`badge badge--${color}`}>{status}</span>;
}

export function ProgressBar({ value, color }: { value: number; color: Accent }) {
  return (
    <div className="progress-bar">
      <div className={`progress-fill progress-fill--${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}
