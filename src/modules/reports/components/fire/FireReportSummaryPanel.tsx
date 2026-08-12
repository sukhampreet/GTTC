import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { fireReportSummary } from '@/modules/reports/mock';

const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)', border: '1px solid var(--color-border-strong)',
  borderRadius: 4, fontSize: 12, color: 'var(--color-text-primary)',
};

const data = [
  { name: 'Fire Alarms', value: fireReportSummary.fireAlarms, color: 'var(--color-danger-500)' },
  { name: 'Smoke Alerts', value: fireReportSummary.smokeAlerts, color: 'var(--color-warning-500)' },
  { name: 'Heat Alerts', value: fireReportSummary.heatAlerts, color: 'var(--color-accent-500)' },
  { name: 'MCP Events', value: fireReportSummary.mcpEvents, color: 'var(--color-info-500)' },
  { name: 'Faults', value: fireReportSummary.faults, color: 'var(--color-text-tertiary)' },
];

export function FireReportSummaryPanel() {
  return (
    <AppCard>
      <AppCardHeader><AppCardTitle>Fire & Emergency Event Breakdown</AppCardTitle></AppCardHeader>
      <AppCardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={2} strokeWidth={0}>
              {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
          </PieChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
