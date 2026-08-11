import { Lightbulb, LightbulbOff, MapPinned, Zap } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { lightingZones } from '@/modules/environment-monitoring/mock';
import { LightingZoneCards } from '@/modules/environment-monitoring/components/lighting/LightingZoneCards';

export function LightingPage() {
  const online = lightingZones.filter((z) => z.state === 'on').length;
  const offline = lightingZones.filter((z) => z.state === 'off').length;
  const activeZones = lightingZones.filter((z) => z.state === 'on').length;
  const totalEnergy = lightingZones.reduce((sum, z) => sum + z.energyKw, 0);

  return (
    <div>
      <PageHeader title="Lighting" description="Zone-level lighting status, brightness and energy consumption." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Lights Online" value={online} icon={Lightbulb} tone="success" />
        <StatCard label="Lights Offline" value={offline} icon={LightbulbOff} tone="neutral" />
        <StatCard label="Active Zones" value={activeZones} icon={MapPinned} tone="neutral" />
        <StatCard label="Energy Usage" value={`${totalEnergy.toFixed(1)} kW`} icon={Zap} tone="neutral" />
      </div>

      <LightingZoneCards zones={lightingZones} />
    </div>
  );
}
