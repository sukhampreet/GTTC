import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/settings/components/shared/DataTable';
import { systemLogRecords } from '@/modules/settings/mock';
import { LOG_LEVEL_TONE, titleCase } from '@/modules/settings/components/shared/statusTone';
import { cn } from '@/utils/cn';
import type { LogLevel, SystemLogRecord } from '@/modules/settings/types';

const LEVELS: ('all' | LogLevel)[] = ['all', 'info', 'warning', 'error', 'critical'];
const SERVICES = ['All Services', ...Array.from(new Set(systemLogRecords.map((l) => l.service)))];

export function SystemLogsPage() {
  const [level, setLevel] = useState<'all' | LogLevel>('all');
  const [service, setService] = useState('All Services');

  const filtered = useMemo(
    () =>
      systemLogRecords.filter((l) => {
        const matchesLevel = level === 'all' || l.level === level;
        const matchesService = service === 'All Services' || l.service === service;
        return matchesLevel && matchesService;
      }),
    [level, service],
  );

  const columns: DataTableColumn<SystemLogRecord>[] = [
    { id: 'timestamp', header: 'Timestamp', cell: (r) => <span className="font-mono text-[11.5px]">{r.timestamp}</span>, sortAccessor: (r) => r.timestamp },
    { id: 'service', header: 'Service', cell: (r) => <span className="font-mono text-[12px]">{r.service}</span>, sortAccessor: (r) => r.service },
    { id: 'level', header: 'Level', cell: (r) => <StatusBadge tone={LOG_LEVEL_TONE[r.level]}>{titleCase(r.level)}</StatusBadge>, sortAccessor: (r) => r.level },
    { id: 'message', header: 'Message', cell: (r) => <span className="text-[12.5px]">{r.message}</span> },
    { id: 'source', header: 'Source', cell: (r) => <span className="font-mono text-[11.5px] text-text-tertiary">{r.source}</span>, hideable: true },
    {
      id: 'status',
      header: 'Status',
      cell: (r) => <StatusBadge tone={r.status === 'resolved' ? 'success' : r.status === 'acknowledged' ? 'info' : 'warning'}>{titleCase(r.status)}</StatusBadge>,
      sortAccessor: (r) => r.status,
    },
  ];

  return (
    <div>
      <PageHeader title="System Logs" description="Enterprise log viewer across all platform services." />

      <DataTable
        data={filtered}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.message} ${r.service} ${r.source}`}
        searchPlaceholder="Search log messages…"
        pageSize={8}
        emptyTitle="No logs found"
        emptyDescription="No logs match the current filters."
        filters={
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium capitalize transition-colors',
                    level === l ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                  )}
                >
                  {l === 'all' ? 'All Levels' : l}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {SERVICES.map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className={cn(
                    'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors',
                    service === s ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
}
