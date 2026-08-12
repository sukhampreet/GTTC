import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatCard } from '@/components/data/StatCard';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { events } from '@/modules/event-center/mock/events';
import { acknowledgementRate, eventsByModule, eventsBySeverity, eventsByType, eventTrend } from '@/modules/event-center/mock/eventStats';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';
const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: 4,
  fontSize: 12,
  color: 'var(--color-text-primary)',
};

export function EventStatisticsCharts() {
  const ackRate = Math.round((events.filter((e) => e.acknowledged).length / events.length) * 100);
  const avgAckRate = Math.round(acknowledgementRate.reduce((sum, p) => sum + p.rate, 0) / acknowledgementRate.length);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Overall Acknowledgement Rate" value={`${ackRate}%`} icon={CheckCircle2} tone="success" />
        <StatCard label="7-Day Avg Ack. Rate" value={`${avgAckRate}%`} icon={TrendingUp} tone="info" />
        <StatCard label="Total Events Tracked" value={events.length} tone="neutral" />
        <StatCard label="Distinct Event Types" value={eventsByType.length} tone="neutral" />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Events by Module</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsByModule} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="module" tick={AXIS_TICK} axisLine={false} tickLine={false} width={130} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--color-bg-surface-hover)' }} />
                <Bar dataKey="value" name="Events" radius={[0, 3, 3, 0]}>
                  {eventsByModule.map((entry) => (
                    <Cell key={entry.module} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Events by Severity</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                <Pie data={eventsBySeverity} dataKey="value" nameKey="severity" innerRadius="55%" outerRadius="80%" paddingAngle={2} strokeWidth={0}>
                  {eventsBySeverity.map((entry) => (
                    <Cell key={entry.severity} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Events by Day (Critical Trend)</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={eventTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
                <Line type="monotone" dataKey="critical" name="Critical" stroke="var(--color-danger-500)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="warning" name="Warning" stroke="var(--color-warning-500)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="info" name="Info" stroke="var(--color-info-500)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Top Event Types</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsByType} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="type" tick={AXIS_TICK} axisLine={false} tickLine={false} width={140} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--color-bg-surface-hover)' }} />
                <Bar dataKey="value" name="Occurrences" radius={[0, 3, 3, 0]} fill="var(--color-primary-500)" />
              </BarChart>
            </ResponsiveContainer>
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
