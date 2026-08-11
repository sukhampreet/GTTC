import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/fire-emergency/components/shared/DataTable';
import { HEAT_STATUS_TONE, DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, titleCase } from '@/modules/fire-emergency/components/shared/statusTone';
import type { HeatSensor } from '@/modules/fire-emergency/types';

export interface HeatTableProps {
  sensors: HeatSensor[];
}

const columns: DataTableColumn<HeatSensor>[] = [
  { id: 'name', header: 'Sensor Name', cell: (r) => r.name, sortAccessor: (r) => r.name },
  { id: 'building', header: 'Building', cell: (r) => r.building, sortAccessor: (r) => r.building },
  { id: 'floor', header: 'Floor', cell: (r) => r.floor, sortAccessor: (r) => r.floor },
  { id: 'temperature', header: 'Temperature', cell: (r) => <span className="tabular-nums">{r.temperature}°C</span>, sortAccessor: (r) => r.temperature, align: 'right' },
  { id: 'threshold', header: 'Threshold', cell: (r) => <span className="tabular-nums">{r.threshold}°C</span>, sortAccessor: (r) => r.threshold, align: 'right' },
  { id: 'currentValue', header: 'Current Value', cell: (r) => <span className="tabular-nums">{r.temperature}°C</span> },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={HEAT_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'battery', header: 'Battery', cell: (r) => <span className="tabular-nums">{r.battery}%</span>, sortAccessor: (r) => r.battery, align: 'right' },
  {
    id: 'health',
    header: 'Health',
    cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.health]}>{DEVICE_STATUS_LABEL[r.health]}</StatusBadge>,
    sortAccessor: (r) => r.health,
  },
  { id: 'lastReading', header: 'Last Reading', cell: (r) => r.lastReading },
];

export function HeatTable({ sensors }: HeatTableProps) {
  return (
    <DataTable
      data={sensors}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.name} ${r.building}`}
      searchPlaceholder="Search sensors by name or building…"
      pageSize={8}
      emptyTitle="No heat sensors found"
      emptyDescription="No sensors match the current search."
    />
  );
}
