import { PageHeader } from '@/components/ui/PageHeader';
import { indoorStations } from '@/modules/building-intercom/mock';
import { IndoorStationsTable } from '@/modules/building-intercom/components/indoorStations/IndoorStationsTable';

export function IndoorStationsPage() {
  return (
    <div>
      <PageHeader title="Indoor Stations" description="Inventory and live status of every indoor intercom station across all buildings." />
      <IndoorStationsTable stations={indoorStations} />
    </div>
  );
}
