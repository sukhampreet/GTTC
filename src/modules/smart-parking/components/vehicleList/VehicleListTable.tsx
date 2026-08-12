import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/smart-parking/components/shared/DataTable';
import { VEHICLE_STATUS_TONE, titleCase } from '@/modules/smart-parking/components/shared/statusTone';
import type { VehicleRecord } from '@/modules/smart-parking/types';

export interface VehicleListTableProps {
  vehicles: VehicleRecord[];
}

const columns: DataTableColumn<VehicleRecord>[] = [
  { id: 'vehicleNumber', header: 'Vehicle Number', cell: (r) => <span className="font-mono text-[12px]">{r.vehicleNumber}</span>, sortAccessor: (r) => r.vehicleNumber },
  { id: 'vehicleType', header: 'Vehicle Type', cell: (r) => r.vehicleType, sortAccessor: (r) => r.vehicleType },
  { id: 'owner', header: 'Owner', cell: (r) => r.owner, sortAccessor: (r) => r.owner },
  { id: 'category', header: 'Category', cell: (r) => r.category, sortAccessor: (r) => r.category },
  { id: 'entryTime', header: 'Entry Time', cell: (r) => r.entryTime, sortAccessor: (r) => r.entryTime },
  { id: 'exitTime', header: 'Exit Time', cell: (r) => r.exitTime ?? <span className="text-text-tertiary">—</span> },
  { id: 'duration', header: 'Parking Duration', cell: (r) => <span className="tabular-nums">{r.duration}</span> },
  { id: 'slot', header: 'Slot', cell: (r) => r.slot, sortAccessor: (r) => r.slot },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={VEHICLE_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
];

export function VehicleListTable({ vehicles }: VehicleListTableProps) {
  return (
    <DataTable
      data={vehicles}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.vehicleNumber} ${r.owner} ${r.category} ${r.slot}`}
      searchPlaceholder="Search by vehicle number, owner or slot…"
      pageSize={10}
      emptyTitle="No vehicles found"
      emptyDescription="No vehicle records match the current search."
    />
  );
}
