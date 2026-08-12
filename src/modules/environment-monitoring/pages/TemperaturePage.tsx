import { Thermometer, ArrowDown, ArrowUp, Gauge } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { temperatureSensors, temperatureTrend, TEMPERATURE_THRESHOLD_C } from '@/modules/environment-monitoring/mock';
import { TemperatureChart } from '@/modules/environment-monitoring/components/temperature/TemperatureChart';
import { TemperatureTable } from '@/modules/environment-monitoring/components/temperature/TemperatureTable';
import { THRESHOLD_STATUS_TONE, titleCase } from '@/modules/environment-monitoring/components/shared/statusTone';

export function TemperaturePage() {
  const current = temperatureTrend[temperatureTrend.length - 1]?.value ?? 0;
  const values = temperatureTrend.map((t) => t.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const average = values.reduce((sum, v) => sum + v, 0) / values.length;
  const status = current >= TEMPERATURE_THRESHOLD_C ? 'critical' : current >= TEMPERATURE_THRESHOLD_C - 2 ? 'warning' : 'normal';

  return (
    <div>
      <PageHeader title="Temperature" description="Real-time and historical temperature monitoring across every zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Current" value={`${current.toFixed(1)}°C`} icon={Thermometer} tone="neutral" />
        <StatCard label="Minimum" value={`${min.toFixed(1)}°C`} icon={ArrowDown} tone="info" />
        <StatCard label="Maximum" value={`${max.toFixed(1)}°C`} icon={ArrowUp} tone="warning" />
        <StatCard label="Average" value={`${average.toFixed(1)}°C`} icon={Gauge} tone="neutral" />
        <StatCard label="Threshold" value={`${TEMPERATURE_THRESHOLD_C}°C`} icon={Thermometer} tone="neutral" />
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
        <TemperatureChart data={temperatureTrend} />
      </div>

      <TemperatureTable sensors={temperatureSensors} />
    </div>
  );
}
