import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { parkingSlots } from '@/modules/smart-parking/mock';

const STATUS_COLORS: Record<string, string> = {
  Available: 'var(--color-success-500)',
  Occupied: 'var(--color-info-500)',
  Reserved: 'var(--color-warning-500)',
  Disabled: 'var(--color-text-tertiary)',
};

export function OccupancyChart() {
  const data = [
    { name: 'Available', value: parkingSlots.filter((s) => s.status === 'available').length },
    { name: 'Occupied', value: parkingSlots.filter((s) => s.status === 'occupied').length },
    { name: 'Reserved', value: parkingSlots.filter((s) => s.status === 'reserved').length },
    { name: 'Disabled', value: parkingSlots.filter((s) => s.status === 'disabled').length },
  ];

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Slot Occupancy</AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={2}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} stroke="var(--color-bg-surface)" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'var(--color-bg-surface-raised)',
                border: '1px solid var(--color-border)',
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
