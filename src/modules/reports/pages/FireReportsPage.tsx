import { FlameKindling, Wind, Thermometer, Siren, AlertTriangle, CheckCircle2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { fireReportSummary } from '@/modules/reports/mock';
import { FireReportSummaryPanel } from '@/modules/reports/components/fire/FireReportSummaryPanel';

export function FireReportsPage() {
  return (
    <div>
      <PageHeader title="Fire Reports" description="Fire and life-safety system event summary, sourced from the Fire & Emergency module." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Fire Alarms" value={fireReportSummary.fireAlarms} icon={FlameKindling} tone={fireReportSummary.fireAlarms > 0 ? 'danger' : 'success'} />
        <StatCard label="Smoke Alerts" value={fireReportSummary.smokeAlerts} icon={Wind} tone="warning" />
        <StatCard label="Heat Alerts" value={fireReportSummary.heatAlerts} icon={Thermometer} tone="warning" />
        <StatCard label="MCP Events" value={fireReportSummary.mcpEvents} icon={Siren} tone="neutral" />
        <StatCard label="Faults" value={fireReportSummary.faults} icon={AlertTriangle} tone="warning" />
        <StatCard label="Resolved Alarms" value={fireReportSummary.resolvedAlarms} icon={CheckCircle2} tone="success" />
      </div>

      <FireReportSummaryPanel />
    </div>
  );
}
