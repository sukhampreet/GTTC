import { Car } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/smart-parking/components/shared/DataTable';
import { EVENT_DIRECTION_TONE, titleCase } from '@/modules/smart-parking/components/shared/statusTone';
import type { ANPRDetection } from '@/modules/smart-parking/types';

export interface AnprDetectionsTableProps {
  detections: ANPRDetection[];
}

const columns: DataTableColumn<ANPRDetection>[] = [
  {
    id: 'snapshot',
    header: 'Vehicle',
    cell: (r) => (
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-(--radius-md) border border-border-default bg-surface-raised text-text-tertiary">
          <Car className="size-4" />
        </div>
        <span className="font-mono text-[12px] text-text-secondary">{r.vehicleNumber}</span>
      </div>
    ),
    hideable: false,
  },
  { id: 'detectionTime', header: 'Detection Time', cell: (r) => r.detectionTime, sortAccessor: (r) => r.detectionTime },
  { id: 'camera', header: 'Camera', cell: (r) => r.camera, sortAccessor: (r) => r.camera },
  { id: 'gate', header: 'Gate', cell: (r) => r.gate, sortAccessor: (r) => r.gate },
  {
    id: 'direction',
    header: 'Direction',
    cell: (r) => <StatusBadge tone={EVENT_DIRECTION_TONE[r.direction]}>{titleCase(r.direction)}</StatusBadge>,
    sortAccessor: (r) => r.direction,
  },
  { id: 'confidence', header: 'Confidence', cell: (r) => <span className="tabular-nums">{r.confidence.toFixed(1)}%</span>, sortAccessor: (r) => r.confidence, align: 'right' },
  { id: 'vehicleType', header: 'Vehicle Type', cell: (r) => r.vehicleType, sortAccessor: (r) => r.vehicleType },
];

export function AnprDetectionsTable({ detections }: AnprDetectionsTableProps) {
  return (
    <DataTable
      data={detections}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.vehicleNumber} ${r.camera} ${r.gate}`}
      searchPlaceholder="Search by vehicle number, camera or gate…"
      pageSize={10}
      emptyTitle="No ANPR detections found"
      emptyDescription="No detections match the current search."
    />
  );
}
