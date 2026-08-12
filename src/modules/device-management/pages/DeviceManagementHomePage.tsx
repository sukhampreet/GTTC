import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/device-management/components/home/OverviewCards';
import { DeviceHealthChartPanel } from '@/modules/device-management/components/home/DeviceHealthChartPanel';
import { ModuleDistributionPanel } from '@/modules/device-management/components/home/ModuleDistributionPanel';
import { RecentDeviceEventsPanel } from '@/modules/device-management/components/home/RecentDeviceEventsPanel';
import { QuickActionsPanel } from '@/modules/device-management/components/home/QuickActionsPanel';

export function DeviceManagementHomePage() {
  return (
    <div>
      <PageHeader
        title="Device Management"
        description="Centralized infrastructure and device administration — visibility across every connected security and smart-building device."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DeviceHealthChartPanel />
          <ModuleDistributionPanel />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <RecentDeviceEventsPanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
