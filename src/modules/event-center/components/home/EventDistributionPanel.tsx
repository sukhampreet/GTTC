import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { eventsBySeverity, eventTrend } from '@/modules/event-center/mock/eventStats';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';
const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: 4,
  fontSize: 12,
  color: 'var(--color-text-primary)',
};

export function EventDistributionPanel() {
  return (
    <div className="grid grid-cols-1 gap-3 xl:col-span-4 xl:grid-cols-2">
      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Event Trends (7 Days)</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={eventTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="criticalFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-danger-500)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-danger-500)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="warningFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-warning-500)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-warning-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
              <Area type="monotone" dataKey="critical" name="Critical" stroke="var(--color-danger-500)" fill="url(#criticalFill)" strokeWidth={2} />
              <Area type="monotone" dataKey="warning" name="Warning" stroke="var(--color-warning-500)" fill="url(#warningFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Event Distribution by Severity</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <Pie
                data={eventsBySeverity}
                dataKey="value"
                nameKey="severity"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={2}
                strokeWidth={0}
              >
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
    </div>
  );
}
