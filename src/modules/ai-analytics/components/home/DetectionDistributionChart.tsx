import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { detectionByType } from '@/modules/ai-analytics/mock';

const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: 4,
  fontSize: 12,
  color: 'var(--color-text-primary)',
};

export function DetectionDistributionChart() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Detection Distribution</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <Pie data={detectionByType} dataKey="value" nameKey="category" innerRadius="55%" outerRadius="80%" paddingAngle={2} strokeWidth={0}>
              {detectionByType.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
          </PieChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
