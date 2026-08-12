import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { devices } from '@/modules/device-management/mock/devices';
import { deviceHealthByModule, deviceHealthTrend } from '@/modules/device-management/mock/deviceHealth';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';

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

export function DeviceHealthCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <AppCard>
        <AppCardHeader><AppCardTitle>Health Distribution</AppCardTitle></AppCardHeader>
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

      <AppCard>
        <AppCardHeader><AppCardTitle>Module Health</AppCardTitle></AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deviceHealthByModule} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
              <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="label" tick={AXIS_TICK} axisLine={false} tickLine={false} width={130} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--color-bg-surface-hover)' }} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
              <Bar dataKey="healthy" name="Healthy" stackId="h" fill="var(--color-success-500)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="warning" name="Warning" stackId="h" fill="var(--color-warning-500)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="critical" name="Critical" stackId="h" fill="var(--color-danger-500)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard className="lg:col-span-2">
        <AppCardHeader><AppCardTitle>Device Health Trend (7 Days)</AppCardTitle></AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={deviceHealthTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="healthyFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-success-500)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-success-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={32} unit="%" />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
              <Area type="monotone" dataKey="healthy" name="Healthy %" stroke="var(--color-success-500)" fill="url(#healthyFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
