import { type ReactNode, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Columns3, Download } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { SearchBar } from '@/components/data/SearchBar';
import { Toolbar } from '@/components/data/Toolbar';
import { EmptyState } from '@/components/feedback/EmptyState';
import { cn } from '@/utils/cn';

export interface DataTableColumn<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortAccessor?: (row: T) => string | number;
  align?: 'left' | 'right' | 'center';
  width?: string;
  hideable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  searchableText?: (row: T) => string;
  searchPlaceholder?: string;
  filters?: ReactNode;
  toolbarActions?: ReactNode;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  onExport?: () => void;
  className?: string;
}

type SortDirection = 'asc' | 'desc';

export function DataTable<T>({
  data,
  columns,
  getRowId,
  searchableText,
  searchPlaceholder = 'Search…',
  filters,
  toolbarActions,
  pageSize = 8,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search or filters.',
  onExport,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<{ id: string; direction: SortDirection } | null>(null);
  const [page, setPage] = useState(1);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);
  const columnsMenuRef = useRef<HTMLDivElement>(null);

  const visibleColumns = useMemo(() => columns.filter((c) => !hidden.has(c.id)), [columns, hidden]);

  const filtered = useMemo(() => {
    if (!query.trim() || !searchableText) return data;
    const q = query.trim().toLowerCase();
    return data.filter((row) => searchableText(row).toLowerCase().includes(q));
  }, [data, query, searchableText]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const column = columns.find((c) => c.id === sort.id);
    if (!column?.sortAccessor) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = column.sortAccessor!(a);
      const bv = column.sortAccessor!(b);
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.direction === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = useMemo(
    () => sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [sorted, currentPage, pageSize],
  );

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function toggleSort(columnId: string) {
    setSort((prev) => {
      if (!prev || prev.id !== columnId) return { id: columnId, direction: 'asc' };
      if (prev.direction === 'asc') return { id: columnId, direction: 'desc' };
      return null;
    });
  }

  function toggleColumnVisibility(columnId: string) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(columnId)) next.delete(columnId);
      else next.add(columnId);
      return next;
    });
  }

  return (
    <AppCard className={cn('overflow-hidden', className)}>
      <div className="flex flex-col gap-2.5 border-b border-border-default p-3">
        <Toolbar
          left={
            searchableText ? (
              <SearchBar
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                containerClassName="w-full max-w-xs"
              />
            ) : undefined
          }
          right={
            <div className="flex items-center gap-2">
              {toolbarActions}
              <div className="relative" ref={columnsMenuRef}>
                <Button variant="outline" size="sm" onClick={() => setColumnsMenuOpen((o) => !o)}>
                  <Columns3 className="size-3.5" />
                  Columns
                </Button>
                {columnsMenuOpen && (
                  <div className="absolute right-0 top-9 z-20 w-56 rounded-(--radius-md) border border-border-default bg-surface-raised p-2 shadow-(--shadow-token-lg)">
                    {columns
                      .filter((c) => c.hideable !== false)
                      .map((c) => (
                        <label
                          key={c.id}
                          className="flex cursor-pointer items-center gap-2 rounded-(--radius-sm) px-1.5 py-1.5 text-xs text-text-secondary hover:bg-surface-hover"
                        >
                          <Checkbox checked={!hidden.has(c.id)} onChange={() => toggleColumnVisibility(c.id)} />
                          {c.header}
                        </label>
                      ))}
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={onExport} title="Export (placeholder)">
                <Download className="size-3.5" />
                Export
              </Button>
            </div>
          }
        />
        {filters}
      </div>

      {pageRows.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-border-default bg-surface-raised/60">
                {visibleColumns.map((column) => (
                  <th
                    key={column.id}
                    className={cn(
                      'whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary',
                      column.align === 'right' && 'text-right',
                      column.align === 'center' && 'text-center',
                      column.width,
                    )}
                  >
                    {column.sortAccessor ? (
                      <button
                        onClick={() => toggleSort(column.id)}
                        className="inline-flex items-center gap-1 hover:text-text-secondary"
                      >
                        {column.header}
                        {sort?.id === column.id ? (
                          sort.direction === 'asc' ? (
                            <ArrowUp className="size-3" />
                          ) : (
                            <ArrowDown className="size-3" />
                          )
                        ) : (
                          <ArrowUpDown className="size-3 opacity-40" />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={getRowId(row)} className="border-b border-border-default last:border-0 hover:bg-surface-hover/60">
                  {visibleColumns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        'whitespace-nowrap px-3.5 py-2.5 text-text-secondary',
                        column.align === 'right' && 'text-right',
                        column.align === 'center' && 'text-center',
                      )}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-border-default px-3.5 py-2.5">
        <p className="text-[11px] text-text-tertiary">
          Showing {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, sorted.length)} of {sorted.length}
        </p>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <span className="px-1 text-[11px] text-text-tertiary">
            Page {currentPage} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage >= pageCount}
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </AppCard>
  );
}
