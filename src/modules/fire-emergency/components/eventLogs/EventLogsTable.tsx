import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/fire-emergency/components/shared/DataTable';
import { ALARM_SEVERITY_TONE, titleCase } from '@/modules/fire-emergency/components/shared/statusTone';
import type { EventLogEntry } from '@/modules/fire-emergency/types';
import type { StatusTone } from '@/types/common';

export interface EventLogsTableProps {
  logs: EventLogEntry[];
}

const EVENT_STATUS_TONE: Record<EventLogEntry['status'], StatusTone> = {
  open: 'danger',
  acknowledged: 'warning',
  resolved: 'success',
};

const columns: DataTableColumn<EventLogEntry>[] = [
  { id: 'timestamp', header: 'Timestamp', cell: (r) => <span className="font-mono text-[12px]">{r.timestamp}</span>, sortAccessor: (r) => r.timestamp },
  { id: 'event', header: 'Event', cell: (r) => r.event, sortAccessor: (r) => r.event },
  { id: 'device', header: 'Device', cell: (r) => r.device, sortAccessor: (r) => r.device },
  { id: 'zone', header: 'Zone', cell: (r) => r.zone, sortAccessor: (r) => r.zone },
  {
    id: 'priority',
    header: 'Priority',
    cell: (r) => <StatusBadge tone={ALARM_SEVERITY_TONE[r.priority]}>{titleCase(r.priority)}</StatusBadge>,
    sortAccessor: (r) => r.priority,
  },
  { id: 'operator', header: 'Operator', cell: (r) => r.operator, sortAccessor: (r) => r.operator },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={EVENT_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'remarks', header: 'Remarks', cell: (r) => <span className="text-text-tertiary">{r.remarks}</span> },
];

export function EventLogsTable({ logs }: EventLogsTableProps) {
  return (
    <DataTable
      data={logs}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.event} ${r.device} ${r.zone}`}
      searchPlaceholder="Search events by device, zone or description…"
      pageSize={10}
      emptyTitle="No event log entries"
      emptyDescription="No events match the current search."
    />
  );
}
