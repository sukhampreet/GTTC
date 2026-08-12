import { ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { incidentReports } from '@/modules/reports/mock';
import { IncidentReportsTable } from '@/modules/reports/components/incident/IncidentReportsTable';

export function IncidentReportsPage() {
  const critical = incidentReports.filter((r) => r.severity === 'critical').length;
  const resolved = incidentReports.filter((r) => r.status === 'resolved').length;
  const open = incidentReports.filter((r) => r.status !== 'resolved').length;

  return (
    <div>
      <PageHeader title="Incident Reports" description="Enterprise incident log across every subsystem, with severity, status and resolution detail." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Incidents" value={incidentReports.length} icon={ShieldAlert} tone="neutral" />
        <StatCard label="Critical" value={critical} icon={ShieldAlert} tone={critical > 0 ? 'danger' : 'success'} />
        <StatCard label="Open / In Progress" value={open} icon={Clock} tone={open > 0 ? 'warning' : 'success'} />
        <StatCard label="Resolved" value={resolved} icon={CheckCircle2} tone="success" />
      </div>

      <IncidentReportsTable reports={incidentReports} />
    </div>
  );
}
