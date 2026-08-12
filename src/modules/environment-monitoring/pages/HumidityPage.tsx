import { Droplets, ArrowDown, ArrowUp, Gauge } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { humiditySensors, humidityTrend, HUMIDITY_THRESHOLD_PCT } from '@/modules/environment-monitoring/mock';
import { HumidityChart } from '@/modules/environment-monitoring/components/humidity/HumidityChart';
import { HumidityTable } from '@/modules/environment-monitoring/components/humidity/HumidityTable';
import { THRESHOLD_STATUS_TONE, titleCase } from '@/modules/environment-monitoring/components/shared/statusTone';

export function HumidityPage() {
  const current = humidityTrend[humidityTrend.length - 1]?.value ?? 0;
  const values = humidityTrend.map((t) => t.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const average = values.reduce((sum, v) => sum + v, 0) / values.length;
  const status = current >= HUMIDITY_THRESHOLD_PCT ? 'critical' : current >= HUMIDITY_THRESHOLD_PCT - 8 ? 'warning' : 'normal';

  return (
    <div>
      <PageHeader title="Humidity" description="Real-time and historical humidity monitoring across every zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Current" value={`${current.toFixed(0)}%`} icon={Droplets} tone="neutral" />
        <StatCard label="Minimum" value={`${min.toFixed(0)}%`} icon={ArrowDown} tone="info" />
        <StatCard label="Maximum" value={`${max.toFixed(0)}%`} icon={ArrowUp} tone="warning" />
        <StatCard label="Average" value={`${average.toFixed(0)}%`} icon={Gauge} tone="neutral" />
        <StatCard label="Threshold" value={`${HUMIDITY_THRESHOLD_PCT}%`} icon={Droplets} tone="neutral" />
        <div className="flex items-center gap-3 rounded-(--radius-lg) border border-border-default bg-surface p-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Status</p>
            <div className="mt-1.5">
              <StatusBadge tone={THRESHOLD_STATUS_TONE[status]}>{titleCase(status)}</StatusBadge>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <HumidityChart data={humidityTrend} />
      </div>

      <HumidityTable sensors={humiditySensors} />
    </div>
  );
}
