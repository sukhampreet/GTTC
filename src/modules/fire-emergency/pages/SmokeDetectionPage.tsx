import { FlameKindling, ShieldAlert, AlertTriangle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { smokeSensors } from '@/modules/fire-emergency/mock';
import { SmokeTable } from '@/modules/fire-emergency/components/smoke/SmokeTable';

export function SmokeDetectionPage() {
  const alarms = smokeSensors.filter((s) => s.status === 'alarm').length;
  const warnings = smokeSensors.filter((s) => s.status === 'warning').length;

  return (
    <div>
      <PageHeader title="Smoke Detection" description="Real-time monitoring of every smoke sensor across the campus." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Sensors" value={smokeSensors.length} icon={FlameKindling} tone="neutral" />
        <StatCard label="Active Alarms" value={alarms} icon={ShieldAlert} tone="danger" />
        <StatCard label="Warnings" value={warnings} icon={AlertTriangle} tone="warning" />
      </div>

      <SmokeTable sensors={smokeSensors} />
    </div>
  );
}
