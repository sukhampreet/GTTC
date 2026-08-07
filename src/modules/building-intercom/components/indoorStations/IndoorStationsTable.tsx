import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/building-intercom/components/shared/DataTable';
import { OPERATIONAL_STATE_LABEL, OPERATIONAL_STATE_TONE } from '@/modules/building-intercom/components/shared/statusTone';
import type { IndoorStation } from '@/modules/building-intercom/types';

export interface IndoorStationsTableProps {
  stations: IndoorStation[];
}

const columns: DataTableColumn<IndoorStation>[] = [
  { id: 'stationName', header: 'Station Name', cell: (r) => r.stationName, sortAccessor: (r) => r.stationName },
  { id: 'building', header: 'Building', cell: (r) => r.building, sortAccessor: (r) => r.building },
  { id: 'floor', header: 'Floor', cell: (r) => r.floor, sortAccessor: (r) => r.floor },
  { id: 'room', header: 'Room', cell: (r) => r.room, sortAccessor: (r) => r.room },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={OPERATIONAL_STATE_TONE[r.status]}>{OPERATIONAL_STATE_LABEL[r.status]}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'ipAddress', header: 'IP Address', cell: (r) => <span className="font-mono text-[12px]">{r.ipAddress}</span>, sortAccessor: (r) => r.ipAddress },
  { id: 'firmware', header: 'Firmware', cell: (r) => r.firmware, sortAccessor: (r) => r.firmware, hideable: true },
  { id: 'lastSeen', header: 'Last Seen', cell: (r) => r.lastSeen, sortAccessor: (r) => r.lastSeen },
  {
    id: 'signalStrengthPct',
    header: 'Signal Strength',
    cell: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-hover">
          <div
            className={
              r.signalStrengthPct >= 70
                ? 'h-full bg-success-500'
                : r.signalStrengthPct >= 40
                  ? 'h-full bg-warning-500'
                  : 'h-full bg-danger-500'
            }
            style={{ width: `${r.signalStrengthPct}%` }}
          />
        </div>
        <span className="text-[11px] text-text-tertiary">{r.signalStrengthPct}%</span>
      </div>
    ),
    sortAccessor: (r) => r.signalStrengthPct,
  },
  {
    id: 'health',
    header: 'Health',
    cell: (r) => <StatusBadge tone={r.health} dot>{r.health === 'success' ? 'Healthy' : r.health === 'warning' ? 'Degraded' : 'Critical'}</StatusBadge>,
    sortAccessor: (r) => r.health,
  },
];

export function IndoorStationsTable({ stations }: IndoorStationsTableProps) {
  return (
    <DataTable
      data={stations}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.stationName} ${r.building} ${r.floor} ${r.room} ${r.ipAddress}`}
      searchPlaceholder="Search by station, building or room…"
      pageSize={10}
      emptyTitle="No indoor stations found"
      emptyDescription="No stations match the current search."
    />
  );
}
