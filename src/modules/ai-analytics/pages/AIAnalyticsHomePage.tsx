import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/ai-analytics/components/home/OverviewCards';
import { DetectionTrendsChart } from '@/modules/ai-analytics/components/home/DetectionTrendsChart';
import { DetectionDistributionChart } from '@/modules/ai-analytics/components/home/DetectionDistributionChart';
import { RecentAiAlertsPanel } from '@/modules/ai-analytics/components/home/RecentAiAlertsPanel';
import { AiActivityTimelinePanel } from '@/modules/ai-analytics/components/home/AiActivityTimelinePanel';
import { QuickActionsPanel } from '@/modules/ai-analytics/components/home/QuickActionsPanel';

export function AIAnalyticsHomePage() {
  return (
    <div>
      <PageHeader
        title="AI Analytics"
        description="Centralized AI intelligence command center — detections, alerts and model activity across every AI-enabled camera."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <DetectionTrendsChart />
          <DetectionDistributionChart />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <RecentAiAlertsPanel />
          <AiActivityTimelinePanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
