import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppCard, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { SearchBar } from '@/components/data/SearchBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { ACCESS_CONTROL_PATHS } from '@/modules/access-control/constants/paths';
import { activityLog } from '@/mock/dashboard';
import type { ActivityLogRow, TimelineStatus } from '@/types/dashboard';
import type { StatusTone } from '@/types/common';

const STATUS_LABEL: Record<TimelineStatus, string> = {
  open: 'Open',
  acknowledged: 'Acknowledged',
  resolved: 'Resolved',
};

const STATUS_TONE: Record<TimelineStatus, StatusTone> = {
  open: 'danger',
  acknowledged: 'warning',
  resolved: 'success',
};

type SortKey = keyof Pick<ActivityLogRow, 'time' | 'event' | 'module' | 'priority' | 'operator' | 'status'>;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'time', label: 'Time' },
  { key: 'event', label: 'Event' },
  { key: 'module', label: 'Module' },
  { key: 'priority', label: 'Priority' },
  { key: 'operator', label: 'Operator' },
  { key: 'status', label: 'Status' },
];

const PAGE_SIZE = 6;

export function RecentActivityTable() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('time');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = q
      ? activityLog.filter((row) =>
          [row.event, row.module, row.operator, row.priority, row.status].some((field) =>
            field.toLowerCase().includes(q),
          ),
        )
      : activityLog;

    return [...rows].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      return a[sortKey].localeCompare(b[sortKey]) * dir;
    });
  }, [query, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const paginated = filtered.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  }

  return (
    <AppCard>
      <AppCardHeader className="flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <AppCardTitle>Recent Activity</AppCardTitle>
        <SearchBar
          placeholder="Search activity…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          containerClassName="w-full sm:w-64"
        />
      </AppCardHeader>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-border-default">
              {COLUMNS.map((col) => {
                const isActive = col.key === sortKey;
                const Icon = isActive ? (sortDir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                return (
                  <th key={col.key} className="px-4 py-2.5">
                    <button
                      onClick={() => toggleSort(col.key)}
                      className={cn(
                        'flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide',
                        isActive ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary',
                      )}
                    >
                      {col.label}
                      <Icon className="size-3" />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => {
              const isAccessControl = row.module === 'Access Control';
              return (
                <tr
                  key={row.id}
                  role={isAccessControl ? 'button' : undefined}
                  tabIndex={isAccessControl ? 0 : undefined}
                  onClick={
                    isAccessControl
                      ? () => navigate(`${ROUTES.accessControl}/${ACCESS_CONTROL_PATHS.logs}`)
                      : undefined
                  }
                  onKeyDown={
                    isAccessControl
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') navigate(`${ROUTES.accessControl}/${ACCESS_CONTROL_PATHS.logs}`);
                        }
                      : undefined
                  }
                  className={cn(
                    'border-b border-border-default last:border-0 hover:bg-surface-hover',
                    isAccessControl && 'cursor-pointer',
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[12px] text-text-tertiary">{row.time}</td>
                  <td className="px-4 py-2.5 text-text-primary">{row.event}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-text-secondary">{row.module}</td>
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <StatusBadge tone={row.priority}>{row.priority}</StatusBadge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-text-secondary">{row.operator}</td>
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <StatusBadge tone={STATUS_TONE[row.status]} dot={false}>
                      {STATUS_LABEL[row.status]}
                    </StatusBadge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {paginated.length === 0 && (
          <EmptyState title="No activity found" description="Try adjusting your search." />
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border-default px-4 py-2.5">
        <p className="text-[11px] text-text-tertiary">
          Showing {paginated.length === 0 ? 0 : currentPage * PAGE_SIZE + 1}–
          {Math.min(filtered.length, currentPage * PAGE_SIZE + PAGE_SIZE)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="flex size-7 items-center justify-center rounded-(--radius-sm) text-text-secondary hover:bg-surface-hover disabled:pointer-events-none disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <span className="px-1 text-[11px] tabular-nums text-text-tertiary">
            {currentPage + 1} / {pageCount}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={currentPage >= pageCount - 1}
            className="flex size-7 items-center justify-center rounded-(--radius-sm) text-text-secondary hover:bg-surface-hover disabled:pointer-events-none disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </AppCard>
  );
}
