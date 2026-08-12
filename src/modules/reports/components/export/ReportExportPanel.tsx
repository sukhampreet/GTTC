import { useState } from 'react';
import { FileText, FileSpreadsheet, FileType, Download, CheckCircle2 } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { ReportCategory, ReportFormat } from '@/modules/reports/types';

const REPORT_TYPES: ReportCategory[] = [
  'Daily', 'Weekly', 'Monthly', 'Incident', 'Attendance', 'Parking', 'Fire', 'Access', 'AI', 'Event', 'Device',
];

const FORMATS: { id: ReportFormat; label: string; icon: typeof FileText }[] = [
  { id: 'pdf', label: 'PDF', icon: FileText },
  { id: 'csv', label: 'CSV', icon: FileType },
  { id: 'excel', label: 'Excel', icon: FileSpreadsheet },
];

/**
 * Frontend export UI only — no PDF/export backend exists in the current
 * project, so this renders a professional export form with a placeholder
 * "queued" action rather than a real file generation call (Step 25 / no backend).
 */
export function ReportExportPanel() {
  const [reportType, setReportType] = useState<ReportCategory>('Incident');
  const [format, setFormat] = useState<ReportFormat>('pdf');
  const [from, setFrom] = useState('2026-08-05');
  const [to, setTo] = useState('2026-08-11');
  const [queued, setQueued] = useState(false);

  function handleExport() {
    setQueued(true);
    window.setTimeout(() => setQueued(false), 2500);
  }

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Export Report</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportCategory)}
              className="h-9 w-full rounded-(--radius-sm) border border-border-strong bg-surface-raised px-2.5 text-[12.5px] text-text-primary"
            >
              {REPORT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Module</label>
            <select
              defaultValue="all"
              className="h-9 w-full rounded-(--radius-sm) border border-border-strong bg-surface-raised px-2.5 text-[12.5px] text-text-primary"
            >
              <option value="all">All Modules</option>
              <option value="video-surveillance">Video Surveillance</option>
              <option value="access-control">Access Control</option>
              <option value="building-intercom">Building Intercom</option>
              <option value="fire-emergency">Fire & Emergency</option>
              <option value="smart-parking">Smart Parking</option>
              <option value="live-monitoring">Live Monitoring</option>
              <option value="ai-analytics">AI Analytics</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-text-tertiary">From</label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-text-tertiary">To</label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Format</label>
          <div className="flex gap-2">
            {FORMATS.map((f) => {
              const Icon = f.icon;
              const active = format === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`flex items-center gap-1.5 rounded-(--radius-md) border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    active
                      ? 'border-primary-500 bg-primary-500/12 text-primary-300'
                      : 'border-border-default text-text-secondary hover:border-border-strong hover:bg-surface-hover'
                  }`}
                >
                  <Icon className="size-3.5" />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border-default pt-4">
          <Button variant="primary" onClick={handleExport} disabled={queued}>
            {queued ? <CheckCircle2 className="size-3.5" /> : <Download className="size-3.5" />}
            {queued ? 'Export Queued' : 'Generate Export'}
          </Button>
          {queued && <span className="text-[11.5px] text-text-tertiary">Your {format.toUpperCase()} export has been queued.</span>}
        </div>
      </AppCardContent>
    </AppCard>
  );
}
