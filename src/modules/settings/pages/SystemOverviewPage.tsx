import { Users, Radio, ListChecks } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatCard } from '@/components/data/StatCard';
import { SystemStatusGrid } from '@/modules/settings/components/overview/SystemStatusGrid';
import { overviewRecentEvents, overviewSummary } from '@/modules/settings/mock';

export function SystemOverviewPage() {
  return (
    <div>
      <PageHeader
        title="System Overview"
        description="Administrative overview of system, service and infrastructure health across the platform."
      />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Active Users" value={overviewSummary.activeUsers} icon={Users} tone="success" hint={`of ${overviewSummary.totalUsers} total`} />
          <StatCard label="Active Sessions" value={overviewSummary.activeSessions} icon={Radio} tone="info" />
          <StatCard label="Recent Admin Events" value={overviewRecentEvents.length} icon={ListChecks} tone="neutral" hint="Last 48 hours" />
        </div>

        <SystemStatusGrid />

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Recent Administrative Events</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="p-0">
            <ul className="divide-y divide-border-default">
              {overviewRecentEvents.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <span className="text-[12.5px] text-text-primary">{e.event}</span>
                  <span className="shrink-0 text-[11px] text-text-tertiary">{e.timestamp}</span>
                </li>
              ))}
            </ul>
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
