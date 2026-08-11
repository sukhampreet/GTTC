import { PageHeader } from '@/components/ui/PageHeader';
import { DetectionOverview } from '@/modules/video-surveillance/components/aiDetection/DetectionOverview';
import { DetectionCards } from '@/modules/video-surveillance/components/aiDetection/DetectionCards';
import { AlertTimeline } from '@/modules/video-surveillance/components/aiDetection/AlertTimeline';
import { HeatmapPlaceholder } from '@/modules/video-surveillance/components/aiDetection/HeatmapPlaceholder';

export function AIDetectionPage() {
  return (
    <div>
      <PageHeader
        title="AI Detection"
        description="Unified command center for all AI detection models running across the camera fleet. Select a detection type for details."
      />

      <div className="space-y-4">
        <DetectionOverview />
        <DetectionCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <AlertTimeline />
          <HeatmapPlaceholder />
        </div>
      </div>
    </div>
  );
}
