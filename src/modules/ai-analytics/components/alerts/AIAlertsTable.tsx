import { useMemo, useState } from 'react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { FilterBar } from '@/components/data/FilterBar';
import { DataTable, type DataTableColumn } from '@/modules/ai-analytics/components/shared/DataTable';
import { SEVERITY_TONE, GENERIC_STATUS_TONE, titleCase } from '@/modules/ai-analytics/components/shared/statusTone';
import type { AIAlert, IntrusionSeverity } from '@/modules/ai-analytics/types';

const SEVERITIES: (IntrusionSeverity | 'all')[] = ['all', 'critical', 'high', 'medium', 'low'];
const STATUSES: (AIAlert['status'] | 'all')[] = ['all', 'active', 'acknowledged', 'resolved'];

const columns: DataTableColumn<AIAlert>[] = [
  { id: 'timestamp', header: 'Timestamp', cell: (r) => r.timestamp, sortAccessor: (r) => r.timestamp },
  { id: 'alertType', header: 'Alert Type', cell: (r) => r.alertType, sortAccessor: (r) => r.alertType },
  { id: 'camera', header: 'Camera', cell: (r) => r.camera, sortAccessor: (r) => r.camera },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  { id: 'severity', header: 'Severity', cell: (r) => <StatusBadge tone={SEVERITY_TONE[r.severity]}>{titleCase(r.severity)}</StatusBadge>, sortAccessor: (r) => r.severity },
  { id: 'confidence', header: 'Confidence', cell: (r) => <span className="tabular-nums">{r.confidence}%</span>, sortAccessor: (r) => r.confidence, align: 'right' },
  { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={GENERIC_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>, sortAccessor: (r) => r.status },
];

export function AIAlertsTable({ alerts }: { alerts: AIAlert[] }) {
  const [severity, setSeverity] = useState<IntrusionSeverity | 'all'>('all');
  const [status, setStatus] = useState<AIAlert['status'] | 'all'>('all');

  const filtered = useMemo(
    () =>
      alerts.filter(
        (a) => (severity === 'all' || a.severity === severity) && (status === 'all' || a.status === status),
      ),
    [alerts, severity, status],
  );

  return (
    <DataTable
      data={filtered}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.alertType} ${r.camera} ${r.location}`}
      searchPlaceholder="Search by alert type, camera or location…"
      pageSize={8}
      emptyTitle="No AI alerts found"
      emptyDescription="No alerts match the current filters."
      filters={
        <FilterBar>
          <span className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Severity</span>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as IntrusionSeverity | 'all')}
            className="h-7 rounded-(--radius-sm) border border-border-strong bg-surface-raised px-2 text-xs text-text-primary"
          >
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>{s === 'all' ? 'All' : titleCase(s)}</option>
            ))}
          </select>
          <span className="ml-2 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as AIAlert['status'] | 'all')}
            className="h-7 rounded-(--radius-sm) border border-border-strong bg-surface-raised px-2 text-xs text-text-primary"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s === 'all' ? 'All' : titleCase(s)}</option>
            ))}
          </select>
        </FilterBar>
      }
    />
  );
}
