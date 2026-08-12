import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/smart-parking/components/shared/DataTable';
import { VISITOR_PASS_TONE, titleCase } from '@/modules/smart-parking/components/shared/statusTone';
import type { VisitorVehicle } from '@/modules/smart-parking/types';

export interface VisitorVehicleTableProps {
  visitors: VisitorVehicle[];
}

const columns: DataTableColumn<VisitorVehicle>[] = [
  { id: 'vehicleNumber', header: 'Vehicle Number', cell: (r) => <span className="font-mono text-[12px]">{r.vehicleNumber}</span>, sortAccessor: (r) => r.vehicleNumber },
  { id: 'visitorName', header: 'Visitor Name', cell: (r) => r.visitorName, sortAccessor: (r) => r.visitorName },
  { id: 'company', header: 'Company', cell: (r) => r.company, sortAccessor: (r) => r.company },
  { id: 'host', header: 'Host', cell: (r) => r.host, sortAccessor: (r) => r.host },
  { id: 'purpose', header: 'Purpose', cell: (r) => <span className="text-text-tertiary">{r.purpose}</span> },
  { id: 'entryTime', header: 'Entry Time', cell: (r) => r.entryTime, sortAccessor: (r) => r.entryTime },
  { id: 'exitTime', header: 'Exit Time', cell: (r) => r.exitTime ?? <span className="text-text-tertiary">—</span> },
  {
    id: 'passStatus',
    header: 'Pass Status',
    cell: (r) => <StatusBadge tone={VISITOR_PASS_TONE[r.passStatus]}>{titleCase(r.passStatus)}</StatusBadge>,
    sortAccessor: (r) => r.passStatus,
  },
  { id: 'slot', header: 'Parking Slot', cell: (r) => r.slot },
];

export function VisitorVehicleTable({ visitors }: VisitorVehicleTableProps) {
  return (
    <DataTable
      data={visitors}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.vehicleNumber} ${r.visitorName} ${r.company} ${r.host}`}
      searchPlaceholder="Search by vehicle, visitor or company…"
      pageSize={10}
      emptyTitle="No visitor vehicles found"
      emptyDescription="No visitor vehicle records match the current search."
    />
  );
}
