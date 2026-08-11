import { PageHeader } from '@/components/ui/PageHeader';
import { AnalyticsCards } from '@/modules/video-surveillance/components/analytics/AnalyticsCards';
import { AnalyticsCharts } from '@/modules/video-surveillance/components/analytics/AnalyticsCharts';

export function VideoAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Video Analytics"
        description="Aggregate AI detection performance across the camera fleet. Mock analytics only."
      />
      <div className="space-y-4">
        <AnalyticsCards />
        <AnalyticsCharts />
      </div>
    </div>
  );
}
