import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/smart-parking/components/shared/DataTable';
import { SLOT_STATUS_TONE, titleCase } from '@/modules/smart-parking/components/shared/statusTone';
import type { ParkingSlot } from '@/modules/smart-parking/types';

export interface ParkingSlotsTableProps {
  slots: ParkingSlot[];
}

const columns: DataTableColumn<ParkingSlot>[] = [
  { id: 'slotNumber', header: 'Slot Number', cell: (r) => r.slotNumber, sortAccessor: (r) => r.slotNumber },
  { id: 'zone', header: 'Zone', cell: (r) => r.zone, sortAccessor: (r) => r.zone },
  { id: 'floor', header: 'Floor', cell: (r) => r.floor, sortAccessor: (r) => r.floor },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={SLOT_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  { id: 'vehicle', header: 'Vehicle', cell: (r) => (r.vehicleNumber ? <span className="font-mono text-[12px]">{r.vehicleNumber}</span> : <span className="text-text-tertiary">—</span>) },
  { id: 'reservation', header: 'Reservation', cell: (r) => r.reservedFor ?? <span className="text-text-tertiary">—</span> },
  { id: 'duration', header: 'Duration', cell: (r) => r.duration ?? <span className="text-text-tertiary">—</span> },
];

export function ParkingSlotsTable({ slots }: ParkingSlotsTableProps) {
  return (
    <DataTable
      data={slots}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.slotNumber} ${r.zone} ${r.floor} ${r.vehicleNumber ?? ''}`}
      searchPlaceholder="Search by slot number, zone or vehicle…"
      pageSize={10}
      emptyTitle="No parking slots found"
      emptyDescription="No slots match the current search or filter."
    />
  );
}
