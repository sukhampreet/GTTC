import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/access-control/components/shared/DataTable';
import { ACCESS_LOG_STATUS_TONE, titleCase } from '@/modules/access-control/components/shared/statusTone';
import type { AccessLogEntry } from '@/modules/access-control/types';

export interface AccessLogsTableProps {
  logs: AccessLogEntry[];
}

const columns: DataTableColumn<AccessLogEntry>[] = [
  { id: 'time', header: 'Time', cell: (r) => <span className="font-mono text-[12px] text-text-primary">{r.time}</span>, sortAccessor: (r) => r.time },
  { id: 'userName', header: 'User Name', cell: (r) => r.userName, sortAccessor: (r) => r.userName },
  { id: 'employeeId', header: 'Employee ID', cell: (r) => r.employeeId, sortAccessor: (r) => r.employeeId },
  { id: 'method', header: 'Access Method', cell: (r) => r.method, sortAccessor: (r) => r.method },
  { id: 'door', header: 'Door', cell: (r) => r.door, sortAccessor: (r) => r.door },
  { id: 'building', header: 'Building', cell: (r) => r.building, sortAccessor: (r) => r.building },
  { id: 'direction', header: 'Direction', cell: (r) => (r.direction === 'in' ? 'Entry' : 'Exit'), sortAccessor: (r) => r.direction },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={ACCESS_LOG_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'operator', header: 'Operator', cell: (r) => r.operator, sortAccessor: (r) => r.operator },
  { id: 'remarks', header: 'Remarks', cell: (r) => <span className="text-text-tertiary">{r.remarks}</span>, hideable: true },
];

export function AccessLogsTable({ logs }: AccessLogsTableProps) {
  return (
    <DataTable
      data={logs}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.userName} ${r.employeeId} ${r.door} ${r.building} ${r.method}`}
      searchPlaceholder="Search by user, door or employee ID…"
      pageSize={10}
      emptyTitle="No access log entries"
      emptyDescription="No events match the current search."
    />
  );
}
