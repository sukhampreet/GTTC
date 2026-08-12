import { useState } from 'react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { FilterBar } from '@/components/data/FilterBar';
import { DataTable, type DataTableColumn } from '@/modules/device-management/components/shared/DataTable';
import { MAINTENANCE_PRIORITY_TONE, MAINTENANCE_STATUS_TONE, titleCase } from '@/modules/device-management/components/shared/statusTone';
import { maintenance as maintenanceData } from '@/modules/device-management/mock/maintenance';
import type { MaintenanceRecord } from '@/modules/device-management/types';

export function MaintenanceTable() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = maintenanceData.filter((m) => statusFilter === 'all' || m.status === statusFilter);

  const columns: DataTableColumn<MaintenanceRecord>[] = [
    { id: 'device', header: 'Device', cell: (m) => <span className="font-medium text-text-primary">{m.device}</span>, sortAccessor: (m) => m.device },
    {
      id: 'status',
      header: 'Maintenance Status',
      cell: (m) => <StatusBadge tone={MAINTENANCE_STATUS_TONE[m.status]}>{titleCase(m.status)}</StatusBadge>,
      sortAccessor: (m) => m.status,
    },
    { id: 'date', header: 'Maintenance Date', cell: (m) => m.scheduledDate, sortAccessor: (m) => m.scheduledDate },
    { id: 'technician', header: 'Assigned Technician', cell: (m) => m.technician, sortAccessor: (m) => m.technician },
    {
      id: 'priority',
      header: 'Priority',
      cell: (m) => <StatusBadge tone={MAINTENANCE_PRIORITY_TONE[m.priority]}>{titleCase(m.priority)}</StatusBadge>,
      sortAccessor: (m) => m.priority,
    },
    { id: 'notes', header: 'Notes', cell: (m) => <span className="max-w-xs truncate block">{m.notes}</span> },
  ];

  return (
    <DataTable
      data={filtered}
      columns={columns}
      getRowId={(m) => m.id}
      searchableText={(m) => `${m.device} ${m.technician} ${m.notes}`}
      searchPlaceholder="Search maintenance records…"
      pageSize={8}
      emptyTitle="No maintenance records found"
      onExport={() => window.print()}
      filters={
        <FilterBar>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 rounded-(--radius-md) border border-border-strong bg-surface-raised px-2.5 text-xs text-text-primary focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </FilterBar>
      }
    />
  );
}
