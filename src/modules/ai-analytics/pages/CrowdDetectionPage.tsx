import { Users, MapPinned, BellRing, TrendingUp } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { crowdZones } from '@/modules/ai-analytics/mock';
import { CrowdDensityChart } from '@/modules/ai-analytics/components/crowd/CrowdDensityChart';
import { CrowdZoneCards } from '@/modules/ai-analytics/components/crowd/CrowdZoneCards';

export function CrowdDetectionPage() {
  const currentCrowdCount = crowdZones.reduce((sum, z) => sum + z.currentCount, 0);
  const highDensityZones = crowdZones.filter((z) => z.density === 'high' || z.density === 'critical').length;
  const crowdAlerts = crowdZones.filter((z) => z.currentCount >= z.threshold).length;
  const peakLevel = Math.max(...crowdZones.map((z) => z.peakToday));

  return (
    <div>
      <PageHeader title="Crowd Detection" description="Live crowd density estimation and threshold monitoring across every zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Current Crowd Count" value={currentCrowdCount} icon={Users} tone="neutral" />
        <StatCard label="High Density Zones" value={highDensityZones} icon={MapPinned} tone={highDensityZones > 0 ? 'warning' : 'success'} />
        <StatCard label="Crowd Alerts" value={crowdAlerts} icon={BellRing} tone={crowdAlerts > 0 ? 'danger' : 'success'} />
        <StatCard label="Peak Crowd Level" value={peakLevel} icon={TrendingUp} tone="neutral" />
      </div>

      <div className="space-y-4">
        <CrowdDensityChart />
        <CrowdZoneCards />
      </div>
    </div>
  );
}
