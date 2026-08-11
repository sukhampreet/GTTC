import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/smart-parking/components/home/OverviewCards';
import { OccupancyChart } from '@/modules/smart-parking/components/home/OccupancyChart';
import { GateStatusPanel } from '@/modules/smart-parking/components/home/GateStatusPanel';
import { RecentActivityPanel } from '@/modules/smart-parking/components/home/RecentActivityPanel';
import { AlertsPanel } from '@/modules/smart-parking/components/home/AlertsPanel';
import { QuickActionsPanel } from '@/modules/smart-parking/components/home/QuickActionsPanel';

export function SmartParkingHomePage() {
  return (
    <div>
      <PageHeader
        title="Smart Parking"
        description="Parking command center overview — slot occupancy, gates, barriers and ANPR status across the campus."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <OccupancyChart />
          <GateStatusPanel />
          <QuickActionsPanel />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <RecentActivityPanel />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}
