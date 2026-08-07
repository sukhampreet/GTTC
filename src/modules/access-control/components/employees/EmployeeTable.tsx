import { Check, X } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/access-control/components/shared/DataTable';
import { titleCase } from '@/modules/access-control/components/shared/statusTone';
import type { EmployeeAccessRecord } from '@/modules/access-control/types';
import type { StatusTone } from '@/types/common';

export interface EmployeeTableProps {
  employees: EmployeeAccessRecord[];
}

const EMPLOYEE_STATUS_TONE: Record<EmployeeAccessRecord['status'], StatusTone> = {
  active: 'success',
  suspended: 'danger',
  inactive: 'neutral',
};

const columns: DataTableColumn<EmployeeAccessRecord>[] = [
  { id: 'employeeId', header: 'Employee ID', cell: (r) => <span className="font-mono text-[12px]">{r.employeeId}</span>, sortAccessor: (r) => r.employeeId },
  { id: 'name', header: 'Name', cell: (r) => r.name, sortAccessor: (r) => r.name },
  { id: 'department', header: 'Department', cell: (r) => r.department, sortAccessor: (r) => r.department },
  { id: 'role', header: 'Role', cell: (r) => r.role, sortAccessor: (r) => r.role },
  { id: 'assignedCard', header: 'Assigned Card', cell: (r) => (r.assignedCard ? <span className="font-mono text-[12px]">{r.assignedCard}</span> : <span className="text-text-tertiary">—</span>) },
  {
    id: 'assignedFace',
    header: 'Assigned Face',
    cell: (r) =>
      r.assignedFace ? (
        <Check className="size-3.5 text-success-400" />
      ) : (
        <X className="size-3.5 text-text-tertiary" />
      ),
    align: 'center',
  },
  { id: 'accessLevel', header: 'Access Level', cell: (r) => r.accessLevel, sortAccessor: (r) => r.accessLevel },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={EMPLOYEE_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
];

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <DataTable
      data={employees}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.name} ${r.employeeId} ${r.department} ${r.role}`}
      searchPlaceholder="Search by name, employee ID or department…"
      pageSize={8}
      emptyTitle="No employees found"
      emptyDescription="No employee records match the current search."
    />
  );
}
