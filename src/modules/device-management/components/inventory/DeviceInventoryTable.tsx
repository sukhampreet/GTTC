import { useMemo, useState } from 'react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { FilterBar } from '@/components/data/FilterBar';
import { DataTable, type DataTableColumn } from '@/modules/device-management/components/shared/DataTable';
import { DEVICE_HEALTH_TONE, DEVICE_STATUS_TONE, titleCase } from '@/modules/device-management/components/shared/statusTone';
import { devices } from '@/modules/device-management/mock/devices';
import type { DeviceRecord } from '@/modules/device-management/types';

const MODULE_OPTIONS = Array.from(new Set(devices.map((d) => d.module))).sort();
const TYPE_OPTIONS = Array.from(new Set(devices.map((d) => d.deviceType))).sort();

export function DeviceInventoryTable() {
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = useMemo(
    () =>
      devices.filter(
        (d) =>
          (moduleFilter === 'all' || d.module === moduleFilter) &&
          (statusFilter === 'all' || d.status === statusFilter) &&
          (typeFilter === 'all' || d.deviceType === typeFilter),
      ),
    [moduleFilter, statusFilter, typeFilter],
  );

  const columns: DataTableColumn<DeviceRecord>[] = [
    { id: 'name', header: 'Device Name', cell: (d) => <span className="font-medium text-text-primary">{d.name}</span>, sortAccessor: (d) => d.name },
    { id: 'id', header: 'Device ID', cell: (d) => d.id, sortAccessor: (d) => d.id },
    { id: 'type', header: 'Device Type', cell: (d) => d.deviceType, sortAccessor: (d) => d.deviceType },
    { id: 'module', header: 'Module', cell: (d) => d.module, sortAccessor: (d) => d.module },
    { id: 'location', header: 'Location', cell: (d) => d.location, sortAccessor: (d) => d.location },
    { id: 'ip', header: 'IP Address', cell: (d) => <span className="font-mono">{d.ipAddress}</span>, sortAccessor: (d) => d.ipAddress },
    {
      id: 'status',
      header: 'Status',
      cell: (d) => <StatusBadge tone={DEVICE_STATUS_TONE[d.status]}>{titleCase(d.status)}</StatusBadge>,
      sortAccessor: (d) => d.status,
    },
    {
      id: 'health',
      header: 'Health',
      cell: (d) => <StatusBadge tone={DEVICE_HEALTH_TONE[d.health]}>{titleCase(d.health)}</StatusBadge>,
      sortAccessor: (d) => d.health,
    },
    { id: 'firmware', header: 'Firmware', cell: (d) => d.firmwareCurrent, sortAccessor: (d) => d.firmwareCurrent },
    { id: 'lastSeen', header: 'Last Seen', cell: (d) => d.lastSeen, sortAccessor: (d) => d.lastSeen },
  ];

  return (
    <DataTable
      data={filtered}
      columns={columns}
      getRowId={(d) => d.id}
      searchableText={(d) => `${d.name} ${d.id} ${d.deviceType} ${d.module} ${d.location} ${d.ipAddress}`}
      searchPlaceholder="Search devices…"
      pageSize={10}
      emptyTitle="No devices found"
      emptyDescription="Try adjusting your filters."
      filters={
        <FilterBar>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="h-8 rounded-(--radius-md) border border-border-strong bg-surface-raised px-2.5 text-xs text-text-primary focus:border-primary-500"
          >
            <option value="all">All Modules</option>
            {MODULE_OPTIONS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 rounded-(--radius-md) border border-border-strong bg-surface-raised px-2.5 text-xs text-text-primary focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="online">Online</option>
            <option value="warning">Warning</option>
            <option value="offline">Offline</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-8 rounded-(--radius-md) border border-border-strong bg-surface-raised px-2.5 text-xs text-text-primary focus:border-primary-500"
          >
            <option value="all">All Types</option>
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FilterBar>
      }
      onExport={() => window.print()}
    />
  );
}
