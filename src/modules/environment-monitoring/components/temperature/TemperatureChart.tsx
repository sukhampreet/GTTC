import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import type { TrendPoint } from '@/modules/environment-monitoring/types';

export interface TemperatureChartProps {
  data: TrendPoint[];
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Temperature Trend (24h)</AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={{ stroke: 'var(--color-border)' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} width={32} unit="°C" />
            <Tooltip
              contentStyle={{
                background: 'var(--color-bg-surface-raised)',
                border: '1px solid var(--color-border)',
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Line type="monotone" dataKey="value" name="Temperature" stroke="var(--color-primary-500)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
