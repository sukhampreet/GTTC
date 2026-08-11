import { ScanLine, Gauge, Camera } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { anprDetections, parkingGates } from '@/modules/smart-parking/mock';
import { AnprDetectionsTable } from '@/modules/smart-parking/components/anpr/AnprDetectionsTable';

export function ANPRPage() {
  const avgConfidence = anprDetections.reduce((sum, d) => sum + d.confidence, 0) / anprDetections.length;
  const camerasOnline = parkingGates.filter((g) => g.anprStatus === 'online').length;

  return (
    <div>
      <PageHeader title="ANPR" description="Automatic number plate recognition detections across every entry and exit camera." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Today's Detections" value={anprDetections.length} icon={ScanLine} tone="neutral" />
        <StatCard label="Avg. Confidence" value={`${avgConfidence.toFixed(1)}%`} icon={Gauge} tone="success" />
        <StatCard label="Cameras Online" value={`${camerasOnline}/${parkingGates.length}`} icon={Camera} tone="success" />
      </div>

      <AnprDetectionsTable detections={anprDetections} />
    </div>
  );
}
