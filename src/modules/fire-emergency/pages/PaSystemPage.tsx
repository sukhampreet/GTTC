import { Volume2, Siren, HeartPulse } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { paZones } from '@/modules/fire-emergency/mock';
import { PaZoneCards } from '@/modules/fire-emergency/components/pa/PaZoneCards';

export function PaSystemPage() {
  const totalSpeakers = paZones.reduce((sum, z) => sum + z.speakerCount, 0);
  const emergencyZones = paZones.filter((z) => z.emergencyMode).length;
  const degraded = paZones.filter((z) => z.health !== 'online').length;

  return (
    <div>
      <PageHeader title="Public Address (PA) System" description="Monitor and control the campus-wide public address speaker network." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Speakers" value={totalSpeakers} icon={Volume2} tone="neutral" />
        <StatCard label="Zones in Emergency Mode" value={emergencyZones} icon={Siren} tone={emergencyZones > 0 ? 'danger' : 'success'} />
        <StatCard label="Degraded Zones" value={degraded} icon={HeartPulse} tone="warning" />
      </div>

      <PaZoneCards zones={paZones} />
    </div>
  );
}
