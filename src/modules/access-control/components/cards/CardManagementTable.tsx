import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/access-control/components/shared/DataTable';
import { titleCase } from '@/modules/access-control/components/shared/statusTone';
import type { CardRecord } from '@/modules/access-control/types';
import type { StatusTone } from '@/types/common';

export interface CardManagementTableProps {
  cards: CardRecord[];
}

const CARD_STATUS_TONE: Record<CardRecord['status'], StatusTone> = {
  active: 'success',
  inactive: 'neutral',
  lost: 'danger',
  expired: 'warning',
};

const columns: DataTableColumn<CardRecord>[] = [
  { id: 'cardNumber', header: 'Card Number', cell: (r) => <span className="font-mono text-[12px] text-text-primary">{r.cardNumber}</span>, sortAccessor: (r) => r.cardNumber },
  { id: 'holder', header: 'Card Holder', cell: (r) => r.holder, sortAccessor: (r) => r.holder },
  { id: 'department', header: 'Department', cell: (r) => r.department, sortAccessor: (r) => r.department },
  { id: 'accessLevel', header: 'Access Level', cell: (r) => r.accessLevel, sortAccessor: (r) => r.accessLevel },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={CARD_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'expiryDate', header: 'Expiry Date', cell: (r) => r.expiryDate, sortAccessor: (r) => r.expiryDate },
  { id: 'assignedDoors', header: 'Assigned Doors', cell: (r) => r.assignedDoors, sortAccessor: (r) => r.assignedDoors, align: 'right' },
];

export function CardManagementTable({ cards }: CardManagementTableProps) {
  return (
    <DataTable
      data={cards}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.holder} ${r.cardNumber} ${r.department}`}
      searchPlaceholder="Search by holder, card number or department…"
      pageSize={8}
      emptyTitle="No cards found"
      emptyDescription="No cards match the current search."
    />
  );
}
