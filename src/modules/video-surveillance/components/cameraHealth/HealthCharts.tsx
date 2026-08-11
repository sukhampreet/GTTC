import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { availabilityTrend, healthDistribution, offlineTrend } from '@/modules/video-surveillance/mock';

const TONE_COLOR: Record<string, string> = {
  success: 'var(--color-success-500)',
  warning: 'var(--color-warning-500)',
  danger: 'var(--color-danger-500)',
  neutral: 'var(--color-text-tertiary)',
  info: 'var(--color-info-500)',
};

const tooltipStyle = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border)',
  borderRadius: 6,
  fontSize: 12,
};

export function HealthCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard className="xl:col-span-2">
        <AppCardHeader>
          <AppCardTitle>Camera Availability (24h)</AppCardTitle>
        </AppCardHeader>
        <AppCardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={availabilityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={{ stroke: 'var(--color-border)' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="online" name="Online" stroke="var(--color-success-500)" fill="var(--color-success-500)" fillOpacity={0.15} />
              <Area type="monotone" dataKey="offline" name="Offline" stroke="var(--color-danger-500)" fill="var(--color-danger-500)" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Health Distribution</AppCardTitle>
        </AppCardHeader>
        <AppCardContent>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={healthDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={2}>
                {healthDistribution.map((slice) => (
                  <Cell key={slice.name} fill={TONE_COLOR[slice.tone]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard className="xl:col-span-3">
        <AppCardHeader>
          <AppCardTitle>Weekly Offline Trend</AppCardTitle>
        </AppCardHeader>
        <AppCardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={offlineTrend} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={{ stroke: 'var(--color-border)' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="online" name="Online" fill="var(--color-success-500)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="offline" name="Offline" fill="var(--color-danger-500)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
