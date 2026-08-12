import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { parkingTrend } from '@/modules/reports/mock';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';
const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)', border: '1px solid var(--color-border-strong)',
  borderRadius: 4, fontSize: 12, color: 'var(--color-text-primary)',
};

export function ParkingTrendChart() {
  return (
    <AppCard>
      <AppCardHeader><AppCardTitle>Entries vs Exits by Hour</AppCardTitle></AppCardHeader>
      <AppCardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={parkingTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis dataKey="hour" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={32} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
            <Bar dataKey="entries" name="Entries" fill="var(--color-primary-500)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="exits" name="Exits" fill="var(--color-accent-500)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
