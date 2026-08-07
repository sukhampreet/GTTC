import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/access-control/components/home/OverviewCards';
import { ControllerStatusPanel } from '@/modules/access-control/components/home/ControllerStatusPanel';
import { RecentAlertsPanel } from '@/modules/access-control/components/home/RecentAlertsPanel';
import { QuickActionsPanel } from '@/modules/access-control/components/home/QuickActionsPanel';

export function AccessControlHomePage() {
  return (
    <div>
      <PageHeader
        title="Access Control"
        description="Unified overview of doors, controllers, credentials and access events across all buildings."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <ControllerStatusPanel />
          <RecentAlertsPanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
