import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/ai-analytics/components/shared/DataTable';
import { GENERIC_STATUS_TONE, titleCase } from '@/modules/ai-analytics/components/shared/statusTone';
import type { LineCrossingEvent } from '@/modules/ai-analytics/types';

const columns: DataTableColumn<LineCrossingEvent>[] = [
  { id: 'time', header: 'Time', cell: (r) => r.time, sortAccessor: (r) => r.time },
  { id: 'camera', header: 'Camera', cell: (r) => r.camera, sortAccessor: (r) => r.camera },
  { id: 'line', header: 'Line', cell: (r) => r.line, sortAccessor: (r) => r.line },
  { id: 'direction', header: 'Direction', cell: (r) => titleCase(r.direction), sortAccessor: (r) => r.direction },
  { id: 'confidence', header: 'Confidence', cell: (r) => <span className="tabular-nums">{r.confidence}%</span>, sortAccessor: (r) => r.confidence, align: 'right' },
  { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={GENERIC_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>, sortAccessor: (r) => r.status },
];

export function LineCrossingTable({ events }: { events: LineCrossingEvent[] }) {
  return (
    <DataTable
      data={events}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.camera} ${r.line}`}
      searchPlaceholder="Search by camera or line…"
      pageSize={8}
      emptyTitle="No line-crossing events found"
      emptyDescription="No events match the current search."
    />
  );
}
