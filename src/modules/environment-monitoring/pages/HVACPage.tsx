import { Fan, PlayCircle, PowerOff } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { hvacUnits } from '@/modules/environment-monitoring/mock';
import { HVACUnitCards } from '@/modules/environment-monitoring/components/hvac/HVACUnitCards';

export function HVACPage() {
  const running = hvacUnits.filter((u) => u.running).length;
  const offline = hvacUnits.filter((u) => !u.running).length;

  return (
    <div>
      <PageHeader title="HVAC" description="Climate control units, setpoints and operating mode across every zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="HVAC Units" value={hvacUnits.length} icon={Fan} tone="neutral" />
        <StatCard label="Running" value={running} icon={PlayCircle} tone="success" />
        <StatCard label="Offline" value={offline} icon={PowerOff} tone={offline > 0 ? 'danger' : 'success'} />
      </div>

      <HVACUnitCards units={hvacUnits} />
    </div>
  );
}
