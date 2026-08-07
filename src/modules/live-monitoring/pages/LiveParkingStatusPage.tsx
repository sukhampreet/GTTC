import { PageHeader } from '@/components/ui/PageHeader';
import { ParkingWidget } from '@/modules/live-monitoring/components/parking/ParkingWidget';

export function LiveParkingStatusPage() {
  return (
    <div>
      <PageHeader title="Live Parking Status" description="Live occupancy, gate connectivity and barrier status across all parking zones." />
      <ParkingWidget />
    </div>
  );
}
