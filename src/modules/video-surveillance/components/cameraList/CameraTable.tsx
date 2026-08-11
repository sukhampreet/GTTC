import { Circle } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/video-surveillance/components/shared/DataTable';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, HEALTH_STATE_LABEL, HEALTH_STATE_TONE } from '@/modules/video-surveillance/components/shared/statusTone';
import { cameraHealthRecords } from '@/modules/video-surveillance/mock';
import type { CameraRecord } from '@/modules/video-surveillance/types';

export interface CameraTableProps {
  cameras: CameraRecord[];
}

function healthFor(cameraId: string) {
  return cameraHealthRecords.find((h) => h.cameraId === cameraId)?.state ?? 'healthy';
}

const columns: DataTableColumn<CameraRecord>[] = [
  { id: 'name', header: 'Camera Name', cell: (r) => <span className="font-medium text-text-primary">{r.name}</span>, sortAccessor: (r) => r.name },
  { id: 'ipAddress', header: 'IP Address', cell: (r) => <span className="font-mono text-[12px]">{r.ipAddress}</span>, sortAccessor: (r) => r.ipAddress },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.status]}>{DEVICE_STATUS_LABEL[r.status]}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  {
    id: 'recording',
    header: 'Recording',
    cell: (r) =>
      r.recording ? (
        <span className="flex items-center gap-1 text-danger-400">
          <Circle className="size-2 fill-current" /> Active
        </span>
      ) : (
        <span className="text-text-tertiary">Stopped</span>
      ),
    sortAccessor: (r) => (r.recording ? 1 : 0),
    align: 'center',
  },
  {
    id: 'aiEnabled',
    header: 'AI Enabled',
    cell: (r) => (r.aiEnabled ? <StatusBadge tone="info" dot={false}>AI</StatusBadge> : <span className="text-text-tertiary">—</span>),
    sortAccessor: (r) => (r.aiEnabled ? 1 : 0),
    align: 'center',
  },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  { id: 'building', header: 'Building', cell: (r) => r.building, sortAccessor: (r) => r.building },
  { id: 'floor', header: 'Floor', cell: (r) => r.floor, sortAccessor: (r) => r.floor, hideable: true },
  { id: 'firmware', header: 'Firmware', cell: (r) => <span className="font-mono text-[12px]">{r.firmware}</span>, sortAccessor: (r) => r.firmware, hideable: true },
  { id: 'lastSeen', header: 'Last Seen', cell: (r) => r.lastSeen, sortAccessor: (r) => r.lastSeen },
  {
    id: 'health',
    header: 'Health',
    cell: (r) => {
      const state = healthFor(r.id);
      return <StatusBadge tone={HEALTH_STATE_TONE[state]}>{HEALTH_STATE_LABEL[state]}</StatusBadge>;
    },
    sortAccessor: (r) => healthFor(r.id),
  },
  { id: 'nvr', header: 'NVR', cell: (r) => r.nvr, sortAccessor: (r) => r.nvr, hideable: true },
];

export function CameraTable({ cameras }: CameraTableProps) {
  return (
    <DataTable
      data={cameras}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.name} ${r.ipAddress} ${r.location} ${r.building}`}
      searchPlaceholder="Search by name, IP or location…"
      pageSize={10}
      emptyTitle="No cameras found"
      emptyDescription="No cameras match the current search."
    />
  );
}
