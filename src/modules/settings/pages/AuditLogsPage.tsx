import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/settings/components/shared/DataTable';
import { auditLogRecords } from '@/modules/settings/mock';
import { cn } from '@/utils/cn';
import type { AuditLogRecord } from '@/modules/settings/types';

const MODULES = ['All Modules', ...Array.from(new Set(auditLogRecords.map((a) => a.module)))];

export function AuditLogsPage() {
  const [moduleFilter, setModuleFilter] = useState('All Modules');

  const filtered = useMemo(
    () => auditLogRecords.filter((a) => moduleFilter === 'All Modules' || a.module === moduleFilter),
    [moduleFilter],
  );

  const columns: DataTableColumn<AuditLogRecord>[] = [
    { id: 'timestamp', header: 'Timestamp', cell: (r) => <span className="font-mono text-[11.5px]">{r.timestamp}</span>, sortAccessor: (r) => r.timestamp },
    { id: 'user', header: 'User', cell: (r) => <span className="font-medium text-text-primary">{r.user}</span>, sortAccessor: (r) => r.user },
    { id: 'role', header: 'Role', cell: (r) => <StatusBadge tone="info" dot={false}>{r.role}</StatusBadge>, sortAccessor: (r) => r.role },
    { id: 'action', header: 'Action', cell: (r) => r.action, sortAccessor: (r) => r.action },
    { id: 'module', header: 'Module', cell: (r) => <StatusBadge tone="neutral" dot={false}>{r.module}</StatusBadge>, sortAccessor: (r) => r.module },
    { id: 'target', header: 'Target', cell: (r) => <span className="font-mono text-[11.5px] text-text-tertiary">{r.target}</span> },
    { id: 'ipAddress', header: 'IP Address', cell: (r) => <span className="font-mono text-[12px]">{r.ipAddress}</span>, hideable: true },
    {
      id: 'result',
      header: 'Result',
      cell: (r) => <StatusBadge tone={r.result === 'success' ? 'success' : 'danger'}>{r.result === 'success' ? 'Success' : 'Failed'}</StatusBadge>,
      sortAccessor: (r) => r.result,
    },
  ];

  return (
    <div>
      <PageHeader title="Audit Logs" description="Centralized, immutable log of administrative actions across the platform." />

      <DataTable
        data={filtered}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.user} ${r.action} ${r.target} ${r.module}`}
        searchPlaceholder="Search by user, action or target…"
        pageSize={8}
        emptyTitle="No audit entries found"
        emptyDescription="No audit log entries match the current filters."
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
