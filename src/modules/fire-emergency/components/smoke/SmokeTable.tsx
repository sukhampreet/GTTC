import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/fire-emergency/components/shared/DataTable';
import { SMOKE_STATUS_TONE, DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, titleCase } from '@/modules/fire-emergency/components/shared/statusTone';
import type { SmokeSensor } from '@/modules/fire-emergency/types';

export interface SmokeTableProps {
  sensors: SmokeSensor[];
}

const columns: DataTableColumn<SmokeSensor>[] = [
  { id: 'name', header: 'Sensor Name', cell: (r) => r.name, sortAccessor: (r) => r.name },
  { id: 'building', header: 'Building', cell: (r) => r.building, sortAccessor: (r) => r.building },
  { id: 'floor', header: 'Floor', cell: (r) => r.floor, sortAccessor: (r) => r.floor },
  { id: 'zone', header: 'Zone', cell: (r) => r.zone, sortAccessor: (r) => r.zone },
  {
    id: 'smokeLevel',
    header: 'Smoke Level',
    cell: (r) => <span className="tabular-nums">{r.smokeLevel}%</span>,
    sortAccessor: (r) => r.smokeLevel,
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={SMOKE_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'battery', header: 'Battery', cell: (r) => <span className="tabular-nums">{r.battery}%</span>, sortAccessor: (r) => r.battery, align: 'right' },
  { id: 'signalStrength', header: 'Signal Strength', cell: (r) => <span className="tabular-nums">{r.signalStrength}%</span>, sortAccessor: (r) => r.signalStrength, align: 'right' },
  { id: 'lastTriggered', header: 'Last Triggered', cell: (r) => r.lastTriggered },
  {
    id: 'health',
    header: 'Health',
    cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.health]}>{DEVICE_STATUS_LABEL[r.health]}</StatusBadge>,
    sortAccessor: (r) => r.health,
  },
];

export function SmokeTable({ sensors }: SmokeTableProps) {
  return (
    <DataTable
      data={sensors}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.name} ${r.building} ${r.zone}`}
      searchPlaceholder="Search sensors by name, building or zone…"
      pageSize={8}
      emptyTitle="No smoke sensors found"
      emptyDescription="No sensors match the current search."
    />
  );
}
