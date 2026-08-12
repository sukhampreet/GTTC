import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { eventReportSummary } from '@/modules/reports/mock';

const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)', border: '1px solid var(--color-border-strong)',
  borderRadius: 4, fontSize: 12, color: 'var(--color-text-primary)',
};

const data = [
  { name: 'Critical', value: eventReportSummary.critical, color: 'var(--color-danger-500)' },
  { name: 'Warnings', value: eventReportSummary.warnings, color: 'var(--color-warning-500)' },
  { name: 'Information', value: eventReportSummary.information, color: 'var(--color-info-500)' },
];

/** Uses Event Center terminology already established in the platform. */
export function EventReportSummaryPanel() {
  return (
    <AppCard>
      <AppCardHeader><AppCardTitle>Event Severity Breakdown</AppCardTitle></AppCardHeader>
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
