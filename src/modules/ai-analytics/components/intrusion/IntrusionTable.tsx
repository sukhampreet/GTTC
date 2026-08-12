import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/ai-analytics/components/shared/DataTable';
import { SEVERITY_TONE, GENERIC_STATUS_TONE, titleCase } from '@/modules/ai-analytics/components/shared/statusTone';
import type { IntrusionEvent } from '@/modules/ai-analytics/types';

const columns: DataTableColumn<IntrusionEvent>[] = [
  { id: 'timestamp', header: 'Timestamp', cell: (r) => r.timestamp, sortAccessor: (r) => r.timestamp },
  { id: 'camera', header: 'Camera', cell: (r) => r.camera, sortAccessor: (r) => r.camera },
  { id: 'zone', header: 'Zone', cell: (r) => r.zone, sortAccessor: (r) => r.zone },
  { id: 'detection', header: 'Detection', cell: (r) => r.detection, sortAccessor: (r) => r.detection },
  { id: 'severity', header: 'Severity', cell: (r) => <StatusBadge tone={SEVERITY_TONE[r.severity]}>{titleCase(r.severity)}</StatusBadge>, sortAccessor: (r) => r.severity },
  { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={GENERIC_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>, sortAccessor: (r) => r.status },
];

export function IntrusionTable({ events }: { events: IntrusionEvent[] }) {
  return (
    <DataTable
      data={events}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.camera} ${r.zone} ${r.detection}`}
      searchPlaceholder="Search by camera, zone or detection…"
      pageSize={8}
      emptyTitle="No intrusion events found"
      emptyDescription="No events match the current search."
    />
  );
}
