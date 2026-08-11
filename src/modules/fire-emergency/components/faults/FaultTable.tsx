import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/fire-emergency/components/shared/DataTable';
import { FAULT_PRIORITY_TONE, titleCase } from '@/modules/fire-emergency/components/shared/statusTone';
import type { FaultEntry } from '@/modules/fire-emergency/types';
import type { StatusTone } from '@/types/common';

export interface FaultTableProps {
  faults: FaultEntry[];
}

const FAULT_STATUS_TONE: Record<FaultEntry['status'], StatusTone> = {
  open: 'danger',
  'in-progress': 'warning',
  resolved: 'success',
};

const columns: DataTableColumn<FaultEntry>[] = [
  { id: 'device', header: 'Device', cell: (r) => r.device, sortAccessor: (r) => r.device },
  { id: 'faultType', header: 'Fault Type', cell: (r) => r.faultType, sortAccessor: (r) => r.faultType },
  { id: 'zone', header: 'Zone', cell: (r) => r.zone, sortAccessor: (r) => r.zone },
  {
    id: 'priority',
    header: 'Priority',
    cell: (r) => <StatusBadge tone={FAULT_PRIORITY_TONE[r.priority]}>{titleCase(r.priority)}</StatusBadge>,
    sortAccessor: (r) => r.priority,
  },
  { id: 'reportedTime', header: 'Reported Time', cell: (r) => r.reportedTime },
  {
    id: 'status',
    header: 'Current Status',
    cell: (r) => <StatusBadge tone={FAULT_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'assignedEngineer', header: 'Assigned Engineer', cell: (r) => r.assignedEngineer, sortAccessor: (r) => r.assignedEngineer },
];

export function FaultTable({ faults }: FaultTableProps) {
  return (
    <DataTable
      data={faults}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.device} ${r.faultType} ${r.zone}`}
      searchPlaceholder="Search by device, fault type or zone…"
      pageSize={8}
      emptyTitle="No faults found"
      emptyDescription="No fault entries match the current search."
    />
  );
}
