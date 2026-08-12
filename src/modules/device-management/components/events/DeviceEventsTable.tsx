import { useState } from 'react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { FilterBar } from '@/components/data/FilterBar';
import { DataTable, type DataTableColumn } from '@/modules/device-management/components/shared/DataTable';
import { DEVICE_EVENT_SEVERITY_TONE, titleCase } from '@/modules/device-management/components/shared/statusTone';
import { deviceEvents } from '@/modules/device-management/mock/deviceEvents';
import type { DeviceEventRecord } from '@/modules/device-management/types';

export function DeviceEventsTable() {
  const [severityFilter, setSeverityFilter] = useState('all');

  const filtered = deviceEvents.filter((e) => severityFilter === 'all' || e.severity === severityFilter);

  const columns: DataTableColumn<DeviceEventRecord>[] = [
    { id: 'timestamp', header: 'Timestamp', cell: (e) => e.timestamp, sortAccessor: (e) => e.timestamp },
    { id: 'device', header: 'Device', cell: (e) => <span className="font-medium text-text-primary">{e.device}</span>, sortAccessor: (e) => e.device },
    { id: 'event', header: 'Event', cell: (e) => e.event, sortAccessor: (e) => e.event },
    {
      id: 'severity',
      header: 'Severity',
      cell: (e) => <StatusBadge tone={DEVICE_EVENT_SEVERITY_TONE[e.severity]}>{titleCase(e.severity)}</StatusBadge>,
      sortAccessor: (e) => e.severity,
    },
    { id: 'status', header: 'Status', cell: (e) => <StatusBadge tone={e.status === 'resolved' ? 'success' : e.status === 'acknowledged' ? 'warning' : 'danger'}>{titleCase(e.status)}</StatusBadge>, sortAccessor: (e) => e.status },
    { id: 'description', header: 'Description', cell: (e) => <span className="block max-w-sm truncate">{e.description}</span> },
  ];

  return (
    <DataTable
      data={filtered}
      columns={columns}
      getRowId={(e) => e.id}
      searchableText={(e) => `${e.device} ${e.event} ${e.description}`}
      searchPlaceholder="Search device events…"
      pageSize={10}
      emptyTitle="No device events found"
      onExport={() => window.print()}
      filters={
        <FilterBar>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="h-8 rounded-(--radius-md) border border-border-strong bg-surface-raised px-2.5 text-xs text-text-primary focus:border-primary-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </FilterBar>
      }
    />
  );
}
