import { PageHeader } from '@/components/ui/PageHeader';
import { HeatMapGrid } from '@/modules/ai-analytics/components/heatmaps/HeatMapGrid';

export function HeatMapsPage() {
  return (
    <div>
      <PageHeader title="Heat Maps" description="Activity density, crowd density and movement pattern heat maps across all monitored zones." />

      <div className="space-y-4">
        <HeatMapGrid metric="activityDensity" title="Activity Density" />
        <HeatMapGrid metric="crowdDensity" title="Crowd Density" />
        <HeatMapGrid metric="movementIndex" title="Movement Patterns" />
      </div>
    </div>
  );
}
