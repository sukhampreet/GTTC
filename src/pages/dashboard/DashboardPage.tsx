import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useNow } from '@/hooks/useNow';

import { KpiOverview } from './components/KpiOverview';
import { SystemHealthPanel } from './components/SystemHealthPanel';
import { LiveEventTimeline } from './components/LiveEventTimeline';
import { RecentAlertsPanel } from './components/RecentAlertsPanel';
import { IncidentAnalytics } from './components/IncidentAnalytics';
import { DeviceStatusGrid } from './components/DeviceStatusGrid';
import { StorageWidget } from './components/StorageWidget';
import { NetworkWidget } from './components/NetworkWidget';
import { RecentActivityTable } from './components/RecentActivityTable';
import { QuickActions } from './components/QuickActions';
import { CampusMap } from './components/CampusMap';
import { AccessControlLiveWidget } from '@/modules/access-control/components/dashboard/AccessControlLiveWidget';

export function DashboardPage() {
  const now = useNow(1000);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Unified real-time overview across every connected security subsystem."
        actions={
          <StatusBadge tone="success">
            Live · {now.toLocaleTimeString('en-IN', { hour12: false })}
          </StatusBadge>
        }
      />

      <KpiOverview />

      <SystemHealthPanel />

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LiveEventTimeline />
        </div>
        <RecentAlertsPanel />
      </div>

      <IncidentAnalytics />

      <DeviceStatusGrid />

      <AccessControlLiveWidget />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <StorageWidget />
        <NetworkWidget />
      </div>

      <section>
        <RecentActivityTable />
      </section>

      <QuickActions />

      <CampusMap />
    </div>
  );
}
