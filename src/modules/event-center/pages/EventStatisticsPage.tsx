import { PageHeader } from '@/components/ui/PageHeader';
import { EventStatisticsCharts } from '@/modules/event-center/components/statistics/EventStatisticsCharts';

export function EventStatisticsPage() {
  return (
    <div>
      <PageHeader title="Event Statistics" description="Analytics across module distribution, severity, daily trends and acknowledgement rate." />
      <EventStatisticsCharts />
    </div>
  );
}
