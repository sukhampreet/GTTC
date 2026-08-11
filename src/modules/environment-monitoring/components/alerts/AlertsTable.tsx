import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/environment-monitoring/components/shared/DataTable';
import { ALERT_SEVERITY_TONE, ALERT_STATUS_TONE, titleCase } from '@/modules/environment-monitoring/components/shared/statusTone';
import type { EnvironmentAlert } from '@/modules/environment-monitoring/types';

export interface AlertsTableProps {
  alerts: EnvironmentAlert[];
}

const columns: DataTableColumn<EnvironmentAlert>[] = [
  {
    id: 'severity',
    header: 'Severity',
    cell: (r) => <StatusBadge tone={ALERT_SEVERITY_TONE[r.severity]}>{titleCase(r.severity)}</StatusBadge>,
    sortAccessor: (r) => r.severity,
  },
  { id: 'timestamp', header: 'Timestamp', cell: (r) => <span className="font-mono text-[12px]">{r.timestamp}</span>, sortAccessor: (r) => r.timestamp },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  { id: 'sensor', header: 'Sensor', cell: (r) => r.sensor, sortAccessor: (r) => r.sensor },
  { id: 'description', header: 'Description', cell: (r) => <span className="text-text-tertiary">{r.description}</span> },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={ALERT_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
];

export function AlertsTable({ alerts }: AlertsTableProps) {
  return (
    <DataTable
      data={alerts}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.type} ${r.location} ${r.sensor} ${r.description}`}
      searchPlaceholder="Search alerts by type, location or sensor…"
      pageSize={10}
      emptyTitle="No alerts found"
      emptyDescription="No alerts match the current search or filters."
    />
  );
}
