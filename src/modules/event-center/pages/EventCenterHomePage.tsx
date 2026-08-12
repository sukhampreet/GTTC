import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/event-center/components/home/OverviewCards';
import { CriticalEventsPanel } from '@/modules/event-center/components/home/CriticalEventsPanel';
import { RecentTimelinePanel } from '@/modules/event-center/components/home/RecentTimelinePanel';
import { EventDistributionPanel } from '@/modules/event-center/components/home/EventDistributionPanel';
import { QuickActionsPanel } from '@/modules/event-center/components/home/QuickActionsPanel';

export function EventCenterHomePage() {
  return (
    <div>
      <PageHeader
        title="Event Center"
        description="Centralized event and incident command center — aggregating events from every connected security subsystem."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <CriticalEventsPanel />
          <QuickActionsPanel />
        </div>

        <RecentTimelinePanel />

        <EventDistributionPanel />
      </div>
    </div>
  );
}
