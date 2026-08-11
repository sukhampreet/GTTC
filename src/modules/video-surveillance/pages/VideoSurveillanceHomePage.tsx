import { PageHeader } from '@/components/ui/PageHeader';
import { OverviewCards } from '@/modules/video-surveillance/components/home/OverviewCards';
import { InfrastructurePanel } from '@/modules/video-surveillance/components/home/InfrastructurePanel';
import { RecentAlertsPanel } from '@/modules/video-surveillance/components/home/RecentAlertsPanel';
import { RecentEventsPanel } from '@/modules/video-surveillance/components/home/RecentEventsPanel';
import { CameraHealthSummary } from '@/modules/video-surveillance/components/home/CameraHealthSummary';
import { CameraGroupsPanel } from '@/modules/video-surveillance/components/home/CameraGroupsPanel';
import { QuickActionsPanel } from '@/modules/video-surveillance/components/home/QuickActionsPanel';

export function VideoSurveillanceHomePage() {
  return (
    <div>
      <PageHeader
        title="Video Surveillance"
        description="Unified overview of cameras, NVRs, edge AI devices and recording health across all buildings."
      />

      <div className="space-y-4">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <InfrastructurePanel />
          <RecentAlertsPanel />
          <CameraHealthSummary />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentEventsPanel />
          </div>
          <QuickActionsPanel />
        </div>

        <CameraGroupsPanel />
      </div>
    </div>
  );
}
