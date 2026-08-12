import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/ai-analytics/components/shared/DataTable';
import { MATCH_STATUS_TONE, GENERIC_STATUS_TONE, titleCase } from '@/modules/ai-analytics/components/shared/statusTone';
import type { FaceRecognitionEvent } from '@/modules/ai-analytics/types';

const columns: DataTableColumn<FaceRecognitionEvent>[] = [
  { id: 'timestamp', header: 'Timestamp', cell: (r) => r.timestamp, sortAccessor: (r) => r.timestamp },
  { id: 'person', header: 'Person', cell: (r) => r.person, sortAccessor: (r) => r.person },
  { id: 'camera', header: 'Camera', cell: (r) => r.camera, sortAccessor: (r) => r.camera },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  { id: 'confidence', header: 'Confidence', cell: (r) => <span className="tabular-nums">{r.confidence}%</span>, sortAccessor: (r) => r.confidence, align: 'right' },
  { id: 'matchStatus', header: 'Match Status', cell: (r) => <StatusBadge tone={MATCH_STATUS_TONE[r.matchStatus]}>{titleCase(r.matchStatus)}</StatusBadge>, sortAccessor: (r) => r.matchStatus },
  { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={GENERIC_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>, sortAccessor: (r) => r.status },
];

export function FaceRecognitionTable({ events }: { events: FaceRecognitionEvent[] }) {
  return (
    <DataTable
      data={events}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.person} ${r.camera} ${r.location}`}
      searchPlaceholder="Search by person, camera or location…"
      pageSize={8}
      emptyTitle="No recognition events found"
      emptyDescription="No events match the current search."
    />
  );
}
