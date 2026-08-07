import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/access-control/components/shared/DataTable';
import { titleCase } from '@/modules/access-control/components/shared/statusTone';
import type { BlacklistEntry } from '@/modules/access-control/types';
import type { StatusTone } from '@/types/common';

export interface BlacklistTableProps {
  entries: BlacklistEntry[];
}

const BLACKLIST_STATUS_TONE: Record<BlacklistEntry['status'], StatusTone> = {
  active: 'danger',
  expired: 'neutral',
  'under-review': 'warning',
};

const columns: DataTableColumn<BlacklistEntry>[] = [
  { id: 'name', header: 'Name', cell: (r) => r.name, sortAccessor: (r) => r.name },
  { id: 'reason', header: 'Reason', cell: (r) => <span className="text-text-tertiary">{r.reason}</span> },
  { id: 'addedDate', header: 'Added Date', cell: (r) => r.addedDate, sortAccessor: (r) => r.addedDate },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={BLACKLIST_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'assignedDoors', header: 'Assigned Doors', cell: (r) => r.assignedDoors, align: 'right' },
];

export function BlacklistTable({ entries }: BlacklistTableProps) {
  return (
    <DataTable
      data={entries}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.name} ${r.reason}`}
      searchPlaceholder="Search by name or reason…"
      pageSize={8}
      emptyTitle="No blacklist entries"
      emptyDescription="No entries match the current search."
    />
  );
}
