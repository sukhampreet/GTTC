import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/ai-analytics/components/shared/DataTable';
import { GENERIC_STATUS_TONE, titleCase } from '@/modules/ai-analytics/components/shared/statusTone';
import type { VehicleDetectionEvent } from '@/modules/ai-analytics/types';

const columns: DataTableColumn<VehicleDetectionEvent>[] = [
  { id: 'timestamp', header: 'Timestamp', cell: (r) => r.timestamp, sortAccessor: (r) => r.timestamp },
  { id: 'vehicleType', header: 'Vehicle Type', cell: (r) => titleCase(r.vehicleType), sortAccessor: (r) => r.vehicleType },
  { id: 'camera', header: 'Camera', cell: (r) => r.camera, sortAccessor: (r) => r.camera },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  { id: 'confidence', header: 'Confidence', cell: (r) => <span className="tabular-nums">{r.confidence}%</span>, sortAccessor: (r) => r.confidence, align: 'right' },
  { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={GENERIC_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>, sortAccessor: (r) => r.status },
];

export function VehicleDetectionTable({ events }: { events: VehicleDetectionEvent[] }) {
  return (
    <DataTable
      data={events}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.vehicleType} ${r.camera} ${r.location}`}
      searchPlaceholder="Search by vehicle type, camera or location…"
      pageSize={8}
      emptyTitle="No vehicle detections found"
      emptyDescription="No events match the current search."
    />
  );
}
