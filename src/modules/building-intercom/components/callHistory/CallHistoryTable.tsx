import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/building-intercom/components/shared/DataTable';
import { CALL_HISTORY_STATUS_TONE, titleCase } from '@/modules/building-intercom/components/shared/statusTone';
import type { CallHistoryEntry } from '@/modules/building-intercom/types';

export interface CallHistoryTableProps {
  calls: CallHistoryEntry[];
}

const columns: DataTableColumn<CallHistoryEntry>[] = [
  { id: 'date', header: 'Date', cell: (r) => r.date, sortAccessor: (r) => r.date },
  { id: 'time', header: 'Time', cell: (r) => <span className="font-mono text-[12px] text-text-primary">{r.time}</span>, sortAccessor: (r) => r.time },
  { id: 'caller', header: 'Caller', cell: (r) => r.caller, sortAccessor: (r) => r.caller },
  { id: 'receiver', header: 'Receiver', cell: (r) => r.receiver, sortAccessor: (r) => r.receiver },
  { id: 'callDuration', header: 'Call Duration', cell: (r) => <span className="font-mono text-[12px]">{r.callDuration}</span>, sortAccessor: (r) => r.callDuration },
  { id: 'callType', header: 'Call Type', cell: (r) => r.callType, sortAccessor: (r) => r.callType },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={CALL_HISTORY_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'operator', header: 'Operator', cell: (r) => r.operator, sortAccessor: (r) => r.operator },
];

export function CallHistoryTable({ calls }: CallHistoryTableProps) {
  return (
    <DataTable
      data={calls}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.caller} ${r.receiver} ${r.operator}`}
      searchPlaceholder="Search by caller, receiver or operator…"
      pageSize={10}
      emptyTitle="No call history"
      emptyDescription="No calls match the current search."
    />
  );
}
