import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/fire-emergency/components/home/OverviewCards';
import { FirePanelStatusPanel } from '@/modules/fire-emergency/components/home/FirePanelStatusPanel';
import { RecentAlertsPanel } from '@/modules/fire-emergency/components/home/RecentAlertsPanel';
import { QuickActionsPanel } from '@/modules/fire-emergency/components/home/QuickActionsPanel';

export function FireEmergencyHomePage() {
  return (
    <div>
      <PageHeader
        title="Fire & Emergency"
        description="Fire command center overview — panels, sensors, alarms and emergency broadcast status across all zones."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <FirePanelStatusPanel />
          <RecentAlertsPanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
