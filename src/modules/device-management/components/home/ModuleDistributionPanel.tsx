import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { devices } from '@/modules/device-management/mock/devices';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';

const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: 4,
  fontSize: 12,
  color: 'var(--color-text-primary)',
};

const moduleCounts = Array.from(
  devices.reduce((map, d) => map.set(d.module, (map.get(d.module) ?? 0) + 1), new Map<string, number>()),
).map(([module, value]) => ({ module, value }));

export function ModuleDistributionPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Devices by Module</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={moduleCounts} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
            <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="module" tick={AXIS_TICK} axisLine={false} tickLine={false} width={130} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--color-bg-surface-hover)' }} />
            <Bar dataKey="value" name="Devices" radius={[0, 3, 3, 0]} fill="var(--color-primary-500)" />
          </BarChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
