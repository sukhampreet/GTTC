import { ListTree, ShieldAlert, AlertTriangle, Info, CheckCheck, CheckCircle2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { eventReportSummary } from '@/modules/reports/mock';
import { EventReportSummaryPanel } from '@/modules/reports/components/event/EventReportSummaryPanel';

export function EventReportsPage() {
  return (
    <div>
      <PageHeader title="Event Reports" description="Platform-wide event log summary, using the same terminology as the Event Center module." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Events" value={eventReportSummary.totalEvents} icon={ListTree} tone="neutral" />
        <StatCard label="Critical" value={eventReportSummary.critical} icon={ShieldAlert} tone={eventReportSummary.critical > 0 ? 'danger' : 'success'} />
        <StatCard label="Warnings" value={eventReportSummary.warnings} icon={AlertTriangle} tone="warning" />
        <StatCard label="Information" value={eventReportSummary.information} icon={Info} tone="neutral" />
        <StatCard label="Acknowledged" value={eventReportSummary.acknowledged} icon={CheckCheck} tone="info" />
        <StatCard label="Resolved" value={eventReportSummary.resolved} icon={CheckCircle2} tone="success" />
      </div>

      <EventReportSummaryPanel />
    </div>
  );
}
