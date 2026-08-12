import { useState } from 'react';
import { FileText, FileSpreadsheet, Download, CheckCircle2 } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';
import { events } from '@/modules/event-center/mock/events';
import type { EventSeverity, EventStatus, SourceModule } from '@/modules/event-center/types';

const MODULES: Array<SourceModule | 'all'> = ['all', ...Array.from(new Set(events.map((e) => e.sourceModule)))] as Array<
  SourceModule | 'all'
>;
const SEVERITIES: Array<EventSeverity | 'all'> = ['all', 'critical', 'high', 'warning', 'info'];
const STATUSES: Array<EventStatus | 'all'> = ['all', 'open', 'acknowledged', 'assigned', 'resolved', 'closed'];

export function EventExportPanel() {
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [module, setModule] = useState<SourceModule | 'all'>('all');
  const [severity, setSeverity] = useState<EventSeverity | 'all'>('all');
  const [status, setStatus] = useState<EventStatus | 'all'>('all');
  const [from, setFrom] = useState('2026-08-01');
  const [to, setTo] = useState('2026-08-11');
  const [exported, setExported] = useState(false);

  const matchCount = events.filter(
    (e) =>
      (module === 'all' || e.sourceModule === module) &&
      (severity === 'all' || e.severity === severity) &&
      (status === 'all' || e.status === status) &&
      e.timestamp.slice(0, 10) >= from &&
      e.timestamp.slice(0, 10) <= to,
  ).length;

  function handleExport() {
    setExported(true);
    window.setTimeout(() => setExported(false), 2500);
  }

  return (
    <AppCard className="max-w-3xl">
      <AppCardHeader>
        <AppCardTitle>Export Configuration</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="space-y-5">
        <div>
          <p className="mb-1.5 text-[11px] uppercase tracking-wide text-text-tertiary">Format</p>
          <div className="flex gap-2">
            <button
              onClick={() => setFormat('csv')}
              className={cn(
                'flex flex-1 items-center gap-2 rounded-(--radius-md) border p-3 text-left transition-colors',
                format === 'csv' ? 'border-primary-500 bg-primary-500/10' : 'border-border-default hover:bg-surface-hover',
              )}
            >
              <FileSpreadsheet className="size-4.5 text-text-secondary" />
              <div>
                <p className="text-[12.5px] font-medium text-text-primary">CSV</p>
                <p className="text-[11px] text-text-tertiary">Spreadsheet-compatible</p>
              </div>
            </button>
            <button
              onClick={() => setFormat('pdf')}
              className={cn(
                'flex flex-1 items-center gap-2 rounded-(--radius-md) border p-3 text-left transition-colors',
                format === 'pdf' ? 'border-primary-500 bg-primary-500/10' : 'border-border-default hover:bg-surface-hover',
              )}
            >
              <FileText className="size-4.5 text-text-secondary" />
              <div>
                <p className="text-[12.5px] font-medium text-text-primary">PDF</p>
                <p className="text-[11px] text-text-tertiary">Formatted report</p>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1.5 text-[11px] uppercase tracking-wide text-text-tertiary">Date From</p>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <p className="mb-1.5 text-[11px] uppercase tracking-wide text-text-tertiary">Date To</p>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] uppercase tracking-wide text-text-tertiary">Module</p>
          <div className="flex flex-wrap gap-1.5">
            {MODULES.map((m) => (
              <Button key={m} size="sm" variant={module === m ? 'primary' : 'outline'} onClick={() => setModule(m)}>
                {m === 'all' ? 'All Modules' : m}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[11px] uppercase tracking-wide text-text-tertiary">Severity</p>
            <div className="flex flex-wrap gap-1.5">
              {SEVERITIES.map((s) => (
                <Button key={s} size="sm" variant={severity === s ? 'primary' : 'outline'} onClick={() => setSeverity(s)}>
                  {s === 'all' ? 'All' : s}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] uppercase tracking-wide text-text-tertiary">Status</p>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <Button key={s} size="sm" variant={status === s ? 'primary' : 'outline'} onClick={() => setStatus(s)}>
                  {s === 'all' ? 'All' : s}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border-default pt-4">
          <p className="text-[12px] text-text-secondary">
            <span className="font-semibold text-text-primary">{matchCount}</span> event(s) match the current export filters.
          </p>
          <Button onClick={handleExport}>
            {exported ? <CheckCircle2 className="size-3.5" /> : <Download className="size-3.5" />}
            {exported ? 'Export Queued' : `Export ${format.toUpperCase()}`}
          </Button>
        </div>
      </AppCardContent>
    </AppCard>
  );
}
