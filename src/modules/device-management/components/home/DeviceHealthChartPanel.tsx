import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { devices } from '@/modules/device-management/mock/devices';

const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: 4,
  fontSize: 12,
  color: 'var(--color-text-primary)',
};

const HEALTH_STATE_DATA = [
  { state: 'Healthy', value: devices.filter((d) => d.health === 'healthy').length, color: 'var(--color-success-500)' },
  { state: 'Warning', value: devices.filter((d) => d.health === 'warning').length, color: 'var(--color-warning-500)' },
  { state: 'Critical', value: devices.filter((d) => d.health === 'critical').length, color: 'var(--color-danger-500)' },
  { state: 'Offline', value: devices.filter((d) => d.health === 'offline').length, color: 'var(--color-text-tertiary)' },
  { state: 'Maintenance', value: devices.filter((d) => d.health === 'maintenance').length, color: 'var(--color-info-500)' },
].filter((entry) => entry.value > 0);

export function DeviceHealthChartPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Device Health</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <Pie data={HEALTH_STATE_DATA} dataKey="value" nameKey="state" innerRadius="55%" outerRadius="80%" paddingAngle={2} strokeWidth={0}>
              {HEALTH_STATE_DATA.map((entry) => (
                <Cell key={entry.state} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
          </PieChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
