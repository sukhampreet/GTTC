import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { deviceReportSummary } from '@/modules/reports/mock';

const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)', border: '1px solid var(--color-border-strong)',
  borderRadius: 4, fontSize: 12, color: 'var(--color-text-primary)',
};

const data = [
  { name: 'Online', value: deviceReportSummary.online, color: 'var(--color-success-500)' },
  { name: 'Warning', value: deviceReportSummary.warning, color: 'var(--color-warning-500)' },
  { name: 'Critical', value: deviceReportSummary.critical, color: 'var(--color-danger-500)' },
  { name: 'Maintenance', value: deviceReportSummary.maintenance, color: 'var(--color-info-500)' },
  { name: 'Offline', value: deviceReportSummary.offline, color: 'var(--color-text-tertiary)' },
];

/** Uses Device Management terminology already established in the platform. */
export function DeviceReportSummaryPanel() {
  return (
    <AppCard>
      <AppCardHeader><AppCardTitle>Device Health Breakdown</AppCardTitle></AppCardHeader>
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
