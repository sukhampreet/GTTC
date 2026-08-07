import { PageHeader } from '@/components/ui/PageHeader';
import { BuildingStatusCards } from '@/modules/live-monitoring/components/buildings/BuildingStatusCards';

export function BuildingStatusPage() {
  return (
    <div>
      <PageHeader title="Building Status" description="Per-building health, device connectivity and active alerts across the campus." />
      <BuildingStatusCards />
    </div>
  );
}
