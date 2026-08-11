import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { detectionTypeDistribution, detectionWeeklyTrend } from '@/modules/video-surveillance/mock';

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

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard className="xl:col-span-2">
        <AppCardHeader>
          <AppCardTitle>Weekly Detection Trend</AppCardTitle>
        </AppCardHeader>
        <AppCardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={detectionWeeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={{ stroke: 'var(--color-border)' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="detections" name="Detections" stroke="var(--color-primary-500)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="falseAlarms" name="False Alarms" stroke="var(--color-danger-500)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Detection Type Breakdown</AppCardTitle>
        </AppCardHeader>
        <AppCardContent>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={detectionTypeDistribution} dataKey="value" nameKey="name" innerRadius={48} outerRadius={76} paddingAngle={2}>
                {detectionTypeDistribution.map((slice) => (
                  <Cell key={slice.name} fill={TONE_COLOR[slice.tone]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 10.5 }} />
            </PieChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard className="xl:col-span-3">
        <AppCardHeader>
          <AppCardTitle>Detections vs. False Alarms</AppCardTitle>
        </AppCardHeader>
        <AppCardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={detectionWeeklyTrend} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={{ stroke: 'var(--color-border)' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="detections" name="Detections" fill="var(--color-primary-500)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="falseAlarms" name="False Alarms" fill="var(--color-danger-500)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
