import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import type { WeeklyOccupancyPoint } from '@/modules/smart-parking/types';

export interface WeeklyOccupancyChartProps {
  data: WeeklyOccupancyPoint[];
}

export function WeeklyOccupancyChart({ data }: WeeklyOccupancyChartProps) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Weekly Occupancy Trend</AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={{ stroke: 'var(--color-border)' }} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }}
              axisLine={false}
              tickLine={false}
              width={36}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                background: 'var(--color-bg-surface-raised)',
                border: '1px solid var(--color-border)',
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Line type="monotone" dataKey="occupancy" name="Occupancy %" stroke="var(--color-primary-500)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
