import { PageHeader } from '@/components/ui/PageHeader';
import { AlertPanel } from '@/modules/live-monitoring/components/alerts/AlertPanel';

export function LiveAlertsPage() {
  return (
    <div>
      <PageHeader title="Live Alerts" description="Severity-ranked operational alert feed for the security operations center." />
      <AlertPanel />
    </div>
  );
}
