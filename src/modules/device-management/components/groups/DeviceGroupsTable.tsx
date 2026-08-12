import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/device-management/components/shared/DataTable';
import { deviceGroups } from '@/modules/device-management/mock/deviceGroups';
import type { DeviceGroup } from '@/modules/device-management/types';

const HEALTH_LABEL = { danger: 'Critical', warning: 'Warning', success: 'Healthy', info: 'Info', neutral: 'Unknown' } as const;

export function DeviceGroupsTable() {
  const columns: DataTableColumn<DeviceGroup>[] = [
    { id: 'name', header: 'Group Name', cell: (g) => <span className="font-medium text-text-primary">{g.name}</span>, sortAccessor: (g) => g.name },
    { id: 'module', header: 'Module', cell: (g) => g.module, sortAccessor: (g) => g.module },
    { id: 'count', header: 'Device Count', cell: (g) => g.deviceCount, sortAccessor: (g) => g.deviceCount, align: 'right' },
    { id: 'online', header: 'Online', cell: (g) => g.online, sortAccessor: (g) => g.online, align: 'right' },
    { id: 'offline', header: 'Offline', cell: (g) => g.offline, sortAccessor: (g) => g.offline, align: 'right' },
    {
      id: 'health',
      header: 'Health',
      cell: (g) => <StatusBadge tone={g.health}>{HEALTH_LABEL[g.health]}</StatusBadge>,
      sortAccessor: (g) => g.health,
    },
  ];

  return (
    <DataTable
      data={deviceGroups}
      columns={columns}
      getRowId={(g) => g.id}
      searchableText={(g) => `${g.name} ${g.module}`}
      searchPlaceholder="Search groups…"
      pageSize={10}
      emptyTitle="No device groups found"
      onExport={() => window.print()}
    />
  );
}
