import { UserRound, Camera, TrendingUp } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { personDetectionEvents, cameraAiStatuses } from '@/modules/ai-analytics/mock';
import { PersonDetectionTable } from '@/modules/ai-analytics/components/personDetection/PersonDetectionTable';

export function PersonDetectionPage() {
  const personCount = personDetectionEvents.reduce((sum, p) => sum + p.count, 0);
  const activeCameras = cameraAiStatuses.filter((c) => c.processing).length;

  return (
    <div>
      <PageHeader title="Person Detection" description="Real-time person counts and detection events across every monitored zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Person Count" value={personCount} icon={UserRound} tone="neutral" />
        <StatCard label="Detections Today" value={personDetectionEvents.length} icon={TrendingUp} tone="neutral" />
        <StatCard label="Active Cameras" value={activeCameras} icon={Camera} tone="success" />
      </div>

      <PersonDetectionTable events={personDetectionEvents} />
    </div>
  );
}
