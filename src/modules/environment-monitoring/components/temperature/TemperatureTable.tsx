import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/environment-monitoring/components/shared/DataTable';
import { THRESHOLD_STATUS_TONE, DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, titleCase } from '@/modules/environment-monitoring/components/shared/statusTone';
import type { TemperatureReading } from '@/modules/environment-monitoring/types';

export interface TemperatureTableProps {
  sensors: TemperatureReading[];
}

const columns: DataTableColumn<TemperatureReading>[] = [
  { id: 'name', header: 'Sensor Name', cell: (r) => r.name, sortAccessor: (r) => r.name },
  { id: 'zone', header: 'Location / Zone', cell: (r) => r.zone, sortAccessor: (r) => r.zone },
  { id: 'current', header: 'Current Reading', cell: (r) => <span className="tabular-nums">{r.current}°C</span>, sortAccessor: (r) => r.current, align: 'right' },
  { id: 'min', header: 'Min', cell: (r) => <span className="tabular-nums">{r.min}°C</span>, sortAccessor: (r) => r.min, align: 'right' },
  { id: 'max', header: 'Max', cell: (r) => <span className="tabular-nums">{r.max}°C</span>, sortAccessor: (r) => r.max, align: 'right' },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={THRESHOLD_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  {
    id: 'health',
    header: 'Health',
    cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.health]}>{DEVICE_STATUS_LABEL[r.health]}</StatusBadge>,
    sortAccessor: (r) => r.health,
  },
];

export function TemperatureTable({ sensors }: TemperatureTableProps) {
  return (
    <DataTable
      data={sensors}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.name} ${r.zone}`}
      searchPlaceholder="Search sensors by name or zone…"
      pageSize={8}
      emptyTitle="No temperature sensors found"
      emptyDescription="No sensors match the current search."
    />
  );
}
