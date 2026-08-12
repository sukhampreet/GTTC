import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/smart-parking/components/shared/DataTable';
import { VEHICLE_HISTORY_STATUS_TONE, titleCase } from '@/modules/smart-parking/components/shared/statusTone';
import type { VehicleHistoryEntry } from '@/modules/smart-parking/types';

export interface VehicleHistoryTableProps {
  entries: VehicleHistoryEntry[];
}

const columns: DataTableColumn<VehicleHistoryEntry>[] = [
  { id: 'vehicleNumber', header: 'Vehicle Number', cell: (r) => <span className="font-mono text-[12px]">{r.vehicleNumber}</span>, sortAccessor: (r) => r.vehicleNumber },
  { id: 'date', header: 'Date', cell: (r) => r.date, sortAccessor: (r) => r.date },
  { id: 'entryTime', header: 'Entry Time', cell: (r) => r.entryTime, sortAccessor: (r) => r.entryTime },
  { id: 'exitTime', header: 'Exit Time', cell: (r) => r.exitTime ?? <span className="text-text-tertiary">—</span> },
  { id: 'gate', header: 'Gate', cell: (r) => r.gate, sortAccessor: (r) => r.gate },
  { id: 'slot', header: 'Slot', cell: (r) => r.slot, sortAccessor: (r) => r.slot },
  { id: 'duration', header: 'Duration', cell: (r) => <span className="tabular-nums">{r.duration}</span> },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={VEHICLE_HISTORY_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
];

export function VehicleHistoryTable({ entries }: VehicleHistoryTableProps) {
  return (
    <DataTable
      data={entries}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.vehicleNumber} ${r.gate} ${r.slot} ${r.date}`}
      searchPlaceholder="Search by vehicle number, date or gate…"
      pageSize={10}
      emptyTitle="No vehicle history found"
      emptyDescription="No history records match the current search."
    />
  );
}
