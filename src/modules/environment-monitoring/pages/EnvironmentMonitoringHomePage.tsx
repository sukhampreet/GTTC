import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/environment-monitoring/components/home/OverviewCards';
import { CurrentConditionsPanel } from '@/modules/environment-monitoring/components/home/CurrentConditionsPanel';
import { TrendsPanel } from '@/modules/environment-monitoring/components/home/TrendsPanel';
import { AlertsPanel } from '@/modules/environment-monitoring/components/home/AlertsPanel';
import { DeviceHealthSummaryPanel } from '@/modules/environment-monitoring/components/home/DeviceHealthSummaryPanel';
import { QuickActionsPanel } from '@/modules/environment-monitoring/components/home/QuickActionsPanel';

export function EnvironmentMonitoringHomePage() {
  return (
    <div>
      <PageHeader
        title="Environment Monitoring"
        description="Campus-wide environment overview — temperature, humidity, air quality, occupancy and energy across all zones."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <CurrentConditionsPanel />
          <TrendsPanel />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <AlertsPanel />
          <DeviceHealthSummaryPanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
