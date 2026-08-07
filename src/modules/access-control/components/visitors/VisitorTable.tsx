import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/access-control/components/shared/DataTable';
import { titleCase } from '@/modules/access-control/components/shared/statusTone';
import type { VisitorRecord } from '@/modules/access-control/types';
import type { StatusTone } from '@/types/common';

export interface VisitorTableProps {
  visitors: VisitorRecord[];
}

const VISITOR_STATUS_TONE: Record<VisitorRecord['status'], StatusTone> = {
  'checked-in': 'success',
  'checked-out': 'neutral',
  expected: 'info',
  overstayed: 'danger',
};

const columns: DataTableColumn<VisitorRecord>[] = [
  { id: 'visitorName', header: 'Visitor Name', cell: (r) => r.visitorName, sortAccessor: (r) => r.visitorName },
  { id: 'company', header: 'Company', cell: (r) => r.company, sortAccessor: (r) => r.company },
  { id: 'purpose', header: 'Purpose', cell: (r) => r.purpose, sortAccessor: (r) => r.purpose },
  { id: 'host', header: 'Host', cell: (r) => r.host, sortAccessor: (r) => r.host },
  { id: 'checkIn', header: 'Check-in', cell: (r) => r.checkIn, sortAccessor: (r) => r.checkIn },
  { id: 'checkOut', header: 'Check-out', cell: (r) => r.checkOut ?? '—', sortAccessor: (r) => r.checkOut ?? '' },
  { id: 'passNumber', header: 'Visitor Pass', cell: (r) => <span className="font-mono text-[12px]">{r.passNumber}</span>, sortAccessor: (r) => r.passNumber },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={VISITOR_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
];

export function VisitorTable({ visitors }: VisitorTableProps) {
  return (
    <DataTable
      data={visitors}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.visitorName} ${r.company} ${r.host}`}
      searchPlaceholder="Search by visitor, company or host…"
      pageSize={8}
      emptyTitle="No visitors found"
      emptyDescription="No visitor records match the current search."
    />
  );
}
