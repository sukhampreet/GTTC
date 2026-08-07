import { PageHeader } from '@/components/ui/PageHeader';
import { CampusOverview } from '@/modules/live-monitoring/components/campus/CampusOverview';

export function CampusOverviewPage() {
  return (
    <div>
      <PageHeader title="Campus Overview" description="Professional campus placeholder with building footprints and device-category coverage." />
      <CampusOverview />
    </div>
  );
}
