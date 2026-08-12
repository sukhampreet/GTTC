import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { monthlyReports } from '@/modules/reports/mock';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';
const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)', border: '1px solid var(--color-border-strong)',
  borderRadius: 4, fontSize: 12, color: 'var(--color-text-primary)',
};

export function MonthlyReportChart() {
  return (
    <AppCard>
      <AppCardHeader><AppCardTitle>Monthly Event Trends</AppCardTitle></AppCardHeader>
      <AppCardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyReports} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="incidentsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-danger-500)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-danger-500)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="aiFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={32} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
            <Area type="monotone" dataKey="ai" name="AI Activity" stroke="var(--color-primary-500)" fill="url(#aiFill)" strokeWidth={2} />
            <Area type="monotone" dataKey="incidents" name="Incidents" stroke="var(--color-danger-500)" fill="url(#incidentsFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
