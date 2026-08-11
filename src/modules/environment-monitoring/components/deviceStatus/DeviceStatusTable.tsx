import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/environment-monitoring/components/shared/DataTable';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/environment-monitoring/components/shared/statusTone';
import type { EnvironmentSensor } from '@/modules/environment-monitoring/types';

export interface DeviceStatusTableProps {
  sensors: EnvironmentSensor[];
}

const columns: DataTableColumn<EnvironmentSensor>[] = [
  { id: 'name', header: 'Sensor Name', cell: (r) => r.name, sortAccessor: (r) => r.name },
  { id: 'type', header: 'Type', cell: (r) => r.type, sortAccessor: (r) => r.type },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.status]}>{DEVICE_STATUS_LABEL[r.status]}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'battery', header: 'Battery', cell: (r) => <span className="tabular-nums">{r.battery}%</span>, sortAccessor: (r) => r.battery, align: 'right' },
  { id: 'signalStrength', header: 'Signal', cell: (r) => <span className="tabular-nums">{r.signalStrength}%</span>, sortAccessor: (r) => r.signalStrength, align: 'right' },
  { id: 'lastReading', header: 'Last Reading', cell: (r) => r.lastReading },
  {
    id: 'health',
    header: 'Health',
    cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.health]}>{DEVICE_STATUS_LABEL[r.health]}</StatusBadge>,
    sortAccessor: (r) => r.health,
  },
];

export function DeviceStatusTable({ sensors }: DeviceStatusTableProps) {
  return (
    <DataTable
      data={sensors}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.name} ${r.type} ${r.location}`}
      searchPlaceholder="Search sensors by name, type or location…"
      pageSize={10}
      emptyTitle="No sensors found"
      emptyDescription="No sensors match the current search."
    />
  );
}
