import { Check, X } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/fire-emergency/components/shared/DataTable';
import { ALARM_SEVERITY_TONE, titleCase } from '@/modules/fire-emergency/components/shared/statusTone';
import type { AlarmHistoryEntry } from '@/modules/fire-emergency/types';

export interface AlarmHistoryTableProps {
  entries: AlarmHistoryEntry[];
}

const columns: DataTableColumn<AlarmHistoryEntry>[] = [
  { id: 'date', header: 'Date', cell: (r) => r.date, sortAccessor: (r) => r.date },
  { id: 'time', header: 'Time', cell: (r) => <span className="font-mono text-[12px]">{r.time}</span>, sortAccessor: (r) => r.time },
  { id: 'alarmType', header: 'Alarm Type', cell: (r) => r.alarmType, sortAccessor: (r) => r.alarmType },
  { id: 'device', header: 'Device', cell: (r) => r.device, sortAccessor: (r) => r.device },
  { id: 'zone', header: 'Zone', cell: (r) => r.zone, sortAccessor: (r) => r.zone },
  { id: 'building', header: 'Building', cell: (r) => r.building, sortAccessor: (r) => r.building },
  {
    id: 'severity',
    header: 'Severity',
    cell: (r) => <StatusBadge tone={ALARM_SEVERITY_TONE[r.severity]}>{titleCase(r.severity)}</StatusBadge>,
    sortAccessor: (r) => r.severity,
  },
  {
    id: 'acknowledged',
    header: 'Acknowledged',
    cell: (r) => (r.acknowledged ? <Check className="size-3.5 text-success-400" /> : <X className="size-3.5 text-text-tertiary" />),
    align: 'center',
  },
  {
    id: 'resolved',
    header: 'Resolved',
    cell: (r) => (r.resolved ? <Check className="size-3.5 text-success-400" /> : <X className="size-3.5 text-text-tertiary" />),
    align: 'center',
  },
  { id: 'operator', header: 'Operator', cell: (r) => r.operator, sortAccessor: (r) => r.operator },
];

export function AlarmHistoryTable({ entries }: AlarmHistoryTableProps) {
  return (
    <DataTable
      data={entries}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.alarmType} ${r.device} ${r.zone} ${r.building}`}
      searchPlaceholder="Search by alarm type, device or zone…"
      pageSize={10}
      emptyTitle="No alarm history"
      emptyDescription="No entries match the current search."
    />
  );
}
