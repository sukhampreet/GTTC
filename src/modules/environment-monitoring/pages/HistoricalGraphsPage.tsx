import { PageHeader } from '@/components/ui/PageHeader';
import { HistoricalCharts } from '@/modules/environment-monitoring/components/historicalGraphs/HistoricalCharts';

export function HistoricalGraphsPage() {
  return (
    <div>
      <PageHeader title="Historical Graphs" description="Seven-day trends across temperature, humidity, air quality, CO₂, energy and occupancy." />
      <HistoricalCharts />
    </div>
  );
}
