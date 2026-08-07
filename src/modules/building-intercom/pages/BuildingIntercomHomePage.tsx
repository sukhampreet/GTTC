import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/building-intercom/components/home/OverviewCards';
import { DeviceHealthPanel } from '@/modules/building-intercom/components/home/DeviceHealthPanel';
import { RecentEventsPanel } from '@/modules/building-intercom/components/home/RecentEventsPanel';
import { QuickActionsPanel } from '@/modules/building-intercom/components/home/QuickActionsPanel';

export function BuildingIntercomHomePage() {
  return (
    <div>
      <PageHeader
        title="Building Intercom"
        description="Unified overview of indoor and outdoor intercom stations, live calls and device health across all buildings."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <DeviceHealthPanel />
          <RecentEventsPanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
