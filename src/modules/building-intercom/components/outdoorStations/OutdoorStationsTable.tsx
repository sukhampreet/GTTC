import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/building-intercom/components/shared/DataTable';
import {
  DEVICE_STATUS_LABEL,
  DEVICE_STATUS_TONE,
  DOOR_LINK_TONE,
  CALL_LINE_TONE,
  OPERATIONAL_STATE_LABEL,
  OPERATIONAL_STATE_TONE,
  titleCase,
} from '@/modules/building-intercom/components/shared/statusTone';
import type { OutdoorStation } from '@/modules/building-intercom/types';

export interface OutdoorStationsTableProps {
  stations: OutdoorStation[];
}

const columns: DataTableColumn<OutdoorStation>[] = [
  { id: 'stationName', header: 'Station Name', cell: (r) => r.stationName, sortAccessor: (r) => r.stationName },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  {
    id: 'cameraStatus',
    header: 'Camera Status',
    cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.cameraStatus]}>{DEVICE_STATUS_LABEL[r.cameraStatus]}</StatusBadge>,
    sortAccessor: (r) => r.cameraStatus,
  },
  {
    id: 'doorStatus',
    header: 'Door Status',
    cell: (r) => <StatusBadge tone={DOOR_LINK_TONE[r.doorStatus]}>{titleCase(r.doorStatus)}</StatusBadge>,
    sortAccessor: (r) => r.doorStatus,
  },
  {
    id: 'callStatus',
    header: 'Call Status',
    cell: (r) => <StatusBadge tone={CALL_LINE_TONE[r.callStatus]}>{titleCase(r.callStatus)}</StatusBadge>,
    sortAccessor: (r) => r.callStatus,
  },
  { id: 'ipAddress', header: 'IP Address', cell: (r) => <span className="font-mono text-[12px]">{r.ipAddress}</span>, sortAccessor: (r) => r.ipAddress },
  { id: 'firmware', header: 'Firmware', cell: (r) => r.firmware, sortAccessor: (r) => r.firmware, hideable: true },
  {
    id: 'health',
    header: 'Health',
    cell: (r) => <StatusBadge tone={r.health}>{r.health === 'success' ? 'Healthy' : r.health === 'warning' ? 'Degraded' : 'Critical'}</StatusBadge>,
    sortAccessor: (r) => r.health,
  },
  {
    id: 'onlineStatus',
    header: 'Online Status',
    cell: (r) => <StatusBadge tone={OPERATIONAL_STATE_TONE[r.onlineStatus]}>{OPERATIONAL_STATE_LABEL[r.onlineStatus]}</StatusBadge>,
    sortAccessor: (r) => r.onlineStatus,
  },
];

export function OutdoorStationsTable({ stations }: OutdoorStationsTableProps) {
  return (
    <DataTable
      data={stations}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.stationName} ${r.location} ${r.ipAddress}`}
      searchPlaceholder="Search by station or location…"
      pageSize={10}
      emptyTitle="No outdoor stations found"
      emptyDescription="No stations match the current search."
    />
  );
}
