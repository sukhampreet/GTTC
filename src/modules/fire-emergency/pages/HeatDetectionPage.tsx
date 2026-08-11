import { Thermometer, ShieldAlert, AlertTriangle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { heatSensors } from '@/modules/fire-emergency/mock';
import { HeatTable } from '@/modules/fire-emergency/components/heat/HeatTable';

export function HeatDetectionPage() {
  const alarms = heatSensors.filter((s) => s.status === 'alarm').length;
  const elevated = heatSensors.filter((s) => s.status === 'elevated').length;

  return (
    <div>
      <PageHeader title="Heat Detection" description="Real-time temperature monitoring against configured thresholds." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Sensors" value={heatSensors.length} icon={Thermometer} tone="neutral" />
        <StatCard label="Active Alarms" value={alarms} icon={ShieldAlert} tone="danger" />
        <StatCard label="Elevated" value={elevated} icon={AlertTriangle} tone="warning" />
      </div>

      <HeatTable sensors={heatSensors} />
    </div>
  );
}
