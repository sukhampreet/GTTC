import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import type { TrendPoint } from '@/modules/environment-monitoring/types';

export interface EnergyChartsProps {
  daily: TrendPoint[];
  weekly: TrendPoint[];
}

function TrendChart({ title, data, unit }: { title: string; data: TrendPoint[]; unit: string }) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>{title}</AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={{ stroke: 'var(--color-border)' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} width={34} unit={unit} />
            <Tooltip
              contentStyle={{
                background: 'var(--color-bg-surface-raised)',
                border: '1px solid var(--color-border)',
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" name="Usage" fill="var(--color-warning-500)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}

export function EnergyCharts({ daily, weekly }: EnergyChartsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <TrendChart title="Daily Usage Trend (kWh)" data={daily} unit="kWh" />
      <TrendChart title="Weekly Usage Trend (kWh)" data={weekly} unit="kWh" />
    </div>
  );
}
