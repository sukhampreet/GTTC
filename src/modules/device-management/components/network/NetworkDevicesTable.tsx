import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/device-management/components/shared/DataTable';
import { DEVICE_STATUS_TONE, titleCase } from '@/modules/device-management/components/shared/statusTone';
import { networkDevices } from '@/modules/device-management/mock/networkDevices';
import type { NetworkDeviceRecord } from '@/modules/device-management/types';

export function NetworkDevicesTable() {
  const columns: DataTableColumn<NetworkDeviceRecord>[] = [
    { id: 'device', header: 'Device', cell: (n) => <span className="font-medium text-text-primary">{n.device}</span>, sortAccessor: (n) => n.device },
    { id: 'ip', header: 'IP', cell: (n) => <span className="font-mono">{n.ipAddress}</span>, sortAccessor: (n) => n.ipAddress },
    { id: 'mac', header: 'MAC', cell: (n) => <span className="font-mono">{n.macAddress}</span> },
    { id: 'type', header: 'Type', cell: (n) => n.deviceType, sortAccessor: (n) => n.deviceType },
    {
      id: 'status',
      header: 'Status',
      cell: (n) => <StatusBadge tone={DEVICE_STATUS_TONE[n.status]}>{titleCase(n.status)}</StatusBadge>,
      sortAccessor: (n) => n.status,
    },
    { id: 'bandwidth', header: 'Bandwidth', cell: (n) => (n.bandwidthMbps > 0 ? `${n.bandwidthMbps} Mbps` : '—'), sortAccessor: (n) => n.bandwidthMbps, align: 'right' },
    { id: 'latency', header: 'Latency', cell: (n) => (n.latencyMs > 0 ? `${n.latencyMs} ms` : '—'), sortAccessor: (n) => n.latencyMs, align: 'right' },
    { id: 'lastSeen', header: 'Last Seen', cell: (n) => n.lastSeen },
  ];

  return (
    <DataTable
      data={networkDevices}
      columns={columns}
      getRowId={(n) => n.id}
      searchableText={(n) => `${n.device} ${n.ipAddress} ${n.macAddress} ${n.deviceType}`}
      searchPlaceholder="Search network devices…"
      pageSize={10}
      emptyTitle="No network devices found"
      onExport={() => window.print()}
    />
  );
}
