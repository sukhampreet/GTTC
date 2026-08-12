import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { weeklyReports } from '@/modules/reports/mock';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';
const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)', border: '1px solid var(--color-border-strong)',
  borderRadius: 4, fontSize: 12, color: 'var(--color-text-primary)',
};

export function WeeklyReportChart() {
  return (
    <AppCard>
      <AppCardHeader><AppCardTitle>Weekly Event Trends</AppCardTitle></AppCardHeader>
      <AppCardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyReports} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={32} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
            <Line type="monotone" dataKey="access" name="Access Activity" stroke="var(--color-primary-500)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="parking" name="Parking Activity" stroke="var(--color-accent-500)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ai" name="AI Activity" stroke="var(--color-success-500)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="incidents" name="Security Incidents" stroke="var(--color-danger-500)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
