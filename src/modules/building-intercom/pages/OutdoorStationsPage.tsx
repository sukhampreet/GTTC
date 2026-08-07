import { PageHeader } from '@/components/ui/PageHeader';
import { outdoorStations } from '@/modules/building-intercom/mock';
import { OutdoorStationsTable } from '@/modules/building-intercom/components/outdoorStations/OutdoorStationsTable';

export function OutdoorStationsPage() {
  return (
    <div>
      <PageHeader title="Outdoor Stations" description="Monitor door panels, cameras and call lines for every outdoor intercom station." />
      <OutdoorStationsTable stations={outdoorStations} />
    </div>
  );
}
