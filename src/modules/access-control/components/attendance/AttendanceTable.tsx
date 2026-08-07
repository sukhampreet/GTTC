import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/access-control/components/shared/DataTable';
import { titleCase } from '@/modules/access-control/components/shared/statusTone';
import type { AttendanceRecord } from '@/modules/access-control/types';
import type { StatusTone } from '@/types/common';

export interface AttendanceTableProps {
  records: AttendanceRecord[];
}

const ATTENDANCE_STATUS_TONE: Record<AttendanceRecord['status'], StatusTone> = {
  present: 'success',
  absent: 'danger',
  late: 'warning',
  'on-leave': 'info',
};

const columns: DataTableColumn<AttendanceRecord>[] = [
  { id: 'employeeId', header: 'Employee ID', cell: (r) => <span className="font-mono text-[12px]">{r.employeeId}</span>, sortAccessor: (r) => r.employeeId },
  { id: 'name', header: 'Name', cell: (r) => r.name, sortAccessor: (r) => r.name },
  { id: 'department', header: 'Department', cell: (r) => r.department, sortAccessor: (r) => r.department },
  { id: 'checkIn', header: 'Check-in', cell: (r) => r.checkIn ?? '—' },
  { id: 'checkOut', header: 'Check-out', cell: (r) => r.checkOut ?? '—' },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={ATTENDANCE_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
];

export function AttendanceTable({ records }: AttendanceTableProps) {
  return (
    <DataTable
      data={records}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.name} ${r.employeeId} ${r.department}`}
      searchPlaceholder="Search employees…"
      pageSize={8}
      emptyTitle="No attendance records"
      emptyDescription="No records match the current search."
    />
  );
}
