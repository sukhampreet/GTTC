import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useNow } from '@/hooks/useNow';
import { OverviewCards } from '@/modules/live-monitoring/components/home/OverviewCards';
import { RecentCriticalEvents } from '@/modules/live-monitoring/components/home/RecentCriticalEvents';
import { QuickActionsPanel } from '@/modules/live-monitoring/components/home/QuickActionsPanel';

export function LiveMonitoringHomePage() {
  const now = useNow(1000);

  return (
    <div>
      <PageHeader
        title="Live Monitoring"
        description="Security Operations Center — real-time operational monitoring across every connected subsystem."
        actions={
          <StatusBadge tone="success">
            Live · {now.toLocaleTimeString('en-IN', { hour12: false })}
          </StatusBadge>
        }
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentCriticalEvents />
          </div>
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
