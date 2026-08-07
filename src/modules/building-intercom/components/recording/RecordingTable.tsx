import { PlayCircle, Camera, Video } from 'lucide-react';

import { DataTable, type DataTableColumn } from '@/modules/building-intercom/components/shared/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { RecordingEntry } from '@/modules/building-intercom/types';

export interface RecordingTableProps {
  recordings: RecordingEntry[];
}

const columns: DataTableColumn<RecordingEntry>[] = [
  {
    id: 'type',
    header: 'Type',
    cell: (r) => (
      <StatusBadge tone={r.type === 'call' ? 'info' : 'neutral'} dot={false}>
        {r.type === 'call' ? <Video className="size-3" /> : <Camera className="size-3" />}
        {r.type === 'call' ? 'Call Recording' : 'Snapshot'}
      </StatusBadge>
    ),
    sortAccessor: (r) => r.type,
  },
  { id: 'station', header: 'Station', cell: (r) => r.station, sortAccessor: (r) => r.station },
  { id: 'date', header: 'Date', cell: (r) => <span className="font-mono text-[12px]">{r.date}</span>, sortAccessor: (r) => r.date },
  { id: 'duration', header: 'Duration', cell: (r) => (r.duration ? <span className="font-mono text-[12px]">{r.duration}</span> : '—'), sortAccessor: (r) => r.duration ?? '' },
  { id: 'sizeMb', header: 'Size', cell: (r) => `${r.sizeMb.toFixed(1)} MB`, sortAccessor: (r) => r.sizeMb, align: 'right' },
  { id: 'retentionDays', header: 'Retention', cell: (r) => `${r.retentionDays} days`, sortAccessor: (r) => r.retentionDays },
  {
    id: 'playback',
    header: 'Playback',
    cell: () => (
      <button className="inline-flex items-center gap-1 text-[12px] font-medium text-primary-400 hover:text-primary-300" title="Playback placeholder">
        <PlayCircle className="size-3.5" />
        Play
      </button>
    ),
    hideable: false,
  },
];

export function RecordingTable({ recordings }: RecordingTableProps) {
  return (
    <DataTable
      data={recordings}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.station} ${r.type}`}
      searchPlaceholder="Search by station…"
      pageSize={10}
      emptyTitle="No recordings found"
      emptyDescription="No recordings match the current search."
    />
  );
}
