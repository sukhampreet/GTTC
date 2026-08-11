import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/user-management/components/shared/DataTable';
import { userActivityRecords } from '@/modules/user-management/mock';
import { cn } from '@/utils/cn';
import type { UserActivityRecord } from '@/modules/user-management/types';

const MODULES = ['All Modules', ...Array.from(new Set(userActivityRecords.map((a) => a.module)))];

export function UserActivityPage() {
  const [moduleFilter, setModuleFilter] = useState('All Modules');

  const filtered = useMemo(
    () => userActivityRecords.filter((a) => moduleFilter === 'All Modules' || a.module === moduleFilter),
    [moduleFilter],
  );

  const columns: DataTableColumn<UserActivityRecord>[] = [
    { id: 'user', header: 'User', cell: (r) => <span className="font-medium text-text-primary">{r.user}</span>, sortAccessor: (r) => r.user },
    { id: 'timestamp', header: 'Timestamp', cell: (r) => r.timestamp, sortAccessor: (r) => r.timestamp },
    { id: 'action', header: 'Action', cell: (r) => r.action },
    { id: 'module', header: 'Module', cell: (r) => <StatusBadge tone="neutral" dot={false}>{r.module}</StatusBadge>, sortAccessor: (r) => r.module },
    { id: 'ipAddress', header: 'IP Address', cell: (r) => <span className="font-mono text-[12px]">{r.ipAddress}</span> },
    {
      id: 'result',
      header: 'Result',
      cell: (r) => <StatusBadge tone={r.result === 'success' ? 'success' : 'danger'}>{r.result === 'success' ? 'Success' : 'Failed'}</StatusBadge>,
      sortAccessor: (r) => r.result,
    },
    { id: 'device', header: 'Device', cell: (r) => r.device, hideable: true },
  ];

  return (
    <div>
      <PageHeader title="User Activity" description="Chronological record of user actions across the platform." />

      <DataTable
        data={filtered}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.user} ${r.action} ${r.module} ${r.ipAddress}`}
        searchPlaceholder="Search by user, action or IP…"
        pageSize={8}
        emptyTitle="No activity found"
        emptyDescription="No activity matches the current filters."
        filters={
          <div className="flex flex-wrap items-center gap-1">
            {MODULES.map((m) => (
              <button
                key={m}
                onClick={() => setModuleFilter(m)}
                className={cn(
                  'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors',
                  moduleFilter === m ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                )}
              >
                {m}
              </button>
            ))}
          </div>
        }
      />
    </div>
  );
}
