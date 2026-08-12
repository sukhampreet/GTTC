import { BellRing, ShieldAlert, CheckCircle2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { aiAlerts } from '@/modules/ai-analytics/mock';
import { AIAlertsTable } from '@/modules/ai-analytics/components/alerts/AIAlertsTable';

export function AIAlertsPage() {
  const active = aiAlerts.filter((a) => a.status === 'active').length;
  const critical = aiAlerts.filter((a) => a.severity === 'critical').length;
  const resolved = aiAlerts.filter((a) => a.status === 'resolved').length;

  return (
    <div>
      <PageHeader title="AI Alerts" description="Enterprise alert management for every AI-generated detection event across the platform." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Active Alerts" value={active} icon={BellRing} tone={active > 0 ? 'danger' : 'success'} />
        <StatCard label="Critical Severity" value={critical} icon={ShieldAlert} tone={critical > 0 ? 'danger' : 'success'} />
        <StatCard label="Resolved" value={resolved} icon={CheckCircle2} tone="success" />
      </div>

      <AIAlertsTable alerts={aiAlerts} />
    </div>
  );
}
