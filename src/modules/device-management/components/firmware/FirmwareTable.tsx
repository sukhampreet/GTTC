import { useState } from 'react';
import { Search, CalendarClock } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FilterBar } from '@/components/data/FilterBar';
import { DataTable, type DataTableColumn } from '@/modules/device-management/components/shared/DataTable';
import { FIRMWARE_STATUS_TONE, titleCase } from '@/modules/device-management/components/shared/statusTone';
import { firmware as firmwareData } from '@/modules/device-management/mock/firmware';
import type { FirmwareRecord } from '@/modules/device-management/types';

/**
 * UI-only firmware management. "Check Update" / "View Details" /
 * "Schedule Update" are frontend mock actions — no real firmware is pushed
 * to devices, per the sprint's no-backend constraint.
 */
export function FirmwareTable() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [scheduled, setScheduled] = useState<Set<string>>(new Set());

  const filtered = firmwareData.filter((f) => statusFilter === 'all' || f.status === statusFilter);

  const columns: DataTableColumn<FirmwareRecord>[] = [
    { id: 'device', header: 'Device', cell: (f) => <span className="font-medium text-text-primary">{f.device}</span>, sortAccessor: (f) => f.device },
    { id: 'module', header: 'Module', cell: (f) => f.module, sortAccessor: (f) => f.module },
    { id: 'current', header: 'Current Firmware', cell: (f) => f.currentVersion, sortAccessor: (f) => f.currentVersion },
    { id: 'available', header: 'Available Firmware', cell: (f) => f.availableVersion, sortAccessor: (f) => f.availableVersion },
    { id: 'release', header: 'Release Date', cell: (f) => f.releaseDate, sortAccessor: (f) => f.releaseDate },
    {
      id: 'status',
      header: 'Status',
      cell: (f) =>
        scheduled.has(f.id) ? (
          <StatusBadge tone="info">Update Scheduled</StatusBadge>
        ) : (
          <StatusBadge tone={FIRMWARE_STATUS_TONE[f.status]}>{titleCase(f.status)}</StatusBadge>
        ),
      sortAccessor: (f) => f.status,
    },
    {
      id: 'actions',
      header: 'Actions',
      hideable: false,
      cell: (f) => (
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm">
            <Search className="size-3.5" />
            View Details
          </Button>
          {f.status !== 'up-to-date' && f.status !== 'unsupported' && (
            <Button
              variant="primary"
              size="sm"
              disabled={scheduled.has(f.id)}
              onClick={() => setScheduled((prev) => new Set(prev).add(f.id))}
            >
              <CalendarClock className="size-3.5" />
              {scheduled.has(f.id) ? 'Scheduled' : 'Schedule Update'}
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={filtered}
      columns={columns}
      getRowId={(f) => f.id}
      searchableText={(f) => `${f.device} ${f.module}`}
      searchPlaceholder="Search devices…"
      pageSize={8}
      emptyTitle="No firmware records found"
      onExport={() => window.print()}
      filters={
        <FilterBar>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 rounded-(--radius-md) border border-border-strong bg-surface-raised px-2.5 text-xs text-text-primary focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="up-to-date">Up To Date</option>
            <option value="update-available">Update Available</option>
            <option value="update-scheduled">Update Scheduled</option>
            <option value="unsupported">Unsupported</option>
          </select>
        </FilterBar>
      }
    />
  );
}
