import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { reportHistory } from '@/modules/reports/mock';

export function ReportStatisticsPanel() {
  const reportsToday = reportHistory.filter((r) => r.generatedDate.startsWith('2026-08-11')).length;
  const scheduled = reportHistory.filter((r) => r.generatedBy === 'System Scheduler').length;
  const exportActivity = reportHistory.filter((r) => r.status === 'ready').length;

  const stats = [
    { label: 'Reports Generated', value: reportHistory.length },
    { label: 'Reports Today', value: reportsToday },
    { label: 'Scheduled Reports', value: scheduled },
    { label: 'Export Activity', value: exportActivity },
  ];

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Report Statistics</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="grid flex-1 grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-(--radius-md) border border-border-default bg-surface-raised p-3">
            <p className="text-lg font-semibold tabular-nums text-text-primary">{stat.value}</p>
            <p className="text-[11px] text-text-tertiary">{stat.label}</p>
          </div>
        ))}
      </AppCardContent>
    </AppCard>
  );
}
