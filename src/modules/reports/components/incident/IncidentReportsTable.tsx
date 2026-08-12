import { useMemo, useState } from 'react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { FilterBar } from '@/components/data/FilterBar';
import { DataTable, type DataTableColumn } from '@/modules/reports/components/shared/DataTable';
import { SEVERITY_TONE, INCIDENT_STATUS_TONE, titleCase } from '@/modules/reports/components/shared/statusTone';
import type { IncidentReportEntry, IncidentSeverity } from '@/modules/reports/types';

const SEVERITIES: (IncidentSeverity | 'all')[] = ['all', 'critical', 'high', 'medium', 'low'];
const STATUSES: (IncidentReportEntry['status'] | 'all')[] = ['all', 'open', 'in-progress', 'resolved'];

const columns: DataTableColumn<IncidentReportEntry>[] = [
  { id: 'id', header: 'Incident ID', cell: (r) => r.id, sortAccessor: (r) => r.id },
  { id: 'date', header: 'Date', cell: (r) => r.date, sortAccessor: (r) => r.date },
  { id: 'time', header: 'Time', cell: (r) => r.time, sortAccessor: (r) => r.time },
  { id: 'type', header: 'Type', cell: (r) => r.type, sortAccessor: (r) => r.type },
  { id: 'module', header: 'Module', cell: (r) => r.module, sortAccessor: (r) => r.module },
  { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
  { id: 'severity', header: 'Severity', cell: (r) => <StatusBadge tone={SEVERITY_TONE[r.severity]}>{titleCase(r.severity)}</StatusBadge>, sortAccessor: (r) => r.severity },
  { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={INCIDENT_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>, sortAccessor: (r) => r.status },
  { id: 'assignedOperator', header: 'Assigned Operator', cell: (r) => r.assignedOperator, sortAccessor: (r) => r.assignedOperator },
  { id: 'resolution', header: 'Resolution', cell: (r) => <span className="text-text-tertiary">{r.resolution}</span> },
];

export function IncidentReportsTable({ reports }: { reports: IncidentReportEntry[] }) {
  const [severity, setSeverity] = useState<IncidentSeverity | 'all'>('all');
  const [status, setStatus] = useState<IncidentReportEntry['status'] | 'all'>('all');
  const [module, setModule] = useState<string>('all');

  const modules = useMemo(() => ['all', ...Array.from(new Set(reports.map((r) => r.module)))], [reports]);

  const filtered = useMemo(
    () =>
      reports.filter(
        (r) =>
          (severity === 'all' || r.severity === severity) &&
          (status === 'all' || r.status === status) &&
          (module === 'all' || r.module === module),
      ),
    [reports, severity, status, module],
  );

  return (
    <DataTable
      data={filtered}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.id} ${r.type} ${r.module} ${r.location} ${r.assignedOperator}`}
      searchPlaceholder="Search by ID, type, module, location or operator…"
      pageSize={8}
      emptyTitle="No incident reports found"
      emptyDescription="No incidents match the current filters."
      filters={
        <FilterBar>
          <span className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Severity</span>
          <select value={severity} onChange={(e) => setSeverity(e.target.value as IncidentSeverity | 'all')} className="h-7 rounded-(--radius-sm) border border-border-strong bg-surface-raised px-2 text-xs text-text-primary">
            {SEVERITIES.map((s) => <option key={s} value={s}>{s === 'all' ? 'All' : titleCase(s)}</option>)}
          </select>
          <span className="ml-2 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as IncidentReportEntry['status'] | 'all')} className="h-7 rounded-(--radius-sm) border border-border-strong bg-surface-raised px-2 text-xs text-text-primary">
            {STATUSES.map((s) => <option key={s} value={s}>{s === 'all' ? 'All' : titleCase(s)}</option>)}
          </select>
          <span className="ml-2 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Module</span>
          <select value={module} onChange={(e) => setModule(e.target.value)} className="h-7 rounded-(--radius-sm) border border-border-strong bg-surface-raised px-2 text-xs text-text-primary">
            {modules.map((m) => <option key={m} value={m}>{m === 'all' ? 'All' : m}</option>)}
          </select>
        </FilterBar>
      }
    />
  );
}
