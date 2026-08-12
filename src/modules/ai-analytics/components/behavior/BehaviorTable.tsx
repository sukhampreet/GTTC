import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/ai-analytics/components/shared/DataTable';
import { SEVERITY_TONE, GENERIC_STATUS_TONE, titleCase } from '@/modules/ai-analytics/components/shared/statusTone';
import type { BehaviorEvent } from '@/modules/ai-analytics/types';

const columns: DataTableColumn<BehaviorEvent>[] = [
  { id: 'timestamp', header: 'Timestamp', cell: (r) => r.timestamp, sortAccessor: (r) => r.timestamp },
  { id: 'camera', header: 'Camera', cell: (r) => r.camera, sortAccessor: (r) => r.camera },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  { id: 'behaviorType', header: 'Behavior', cell: (r) => titleCase(r.behaviorType), sortAccessor: (r) => r.behaviorType },
  { id: 'confidence', header: 'Confidence', cell: (r) => <span className="tabular-nums">{r.confidence}%</span>, sortAccessor: (r) => r.confidence, align: 'right' },
  { id: 'severity', header: 'Severity', cell: (r) => <StatusBadge tone={SEVERITY_TONE[r.severity]}>{titleCase(r.severity)}</StatusBadge>, sortAccessor: (r) => r.severity },
  { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={GENERIC_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>, sortAccessor: (r) => r.status },
];

export function BehaviorTable({ events }: { events: BehaviorEvent[] }) {
  return (
    <DataTable
      data={events}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.camera} ${r.location} ${r.behaviorType}`}
      searchPlaceholder="Search by camera, location or behavior…"
      pageSize={8}
      emptyTitle="No behavior events found"
      emptyDescription="No events match the current search."
    />
  );
}
