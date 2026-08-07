import { PageHeader } from '@/components/ui/PageHeader';
import { AccessWidget } from '@/modules/live-monitoring/components/access/AccessWidget';

export function LiveAccessStatusPage() {
  return (
    <div>
      <PageHeader title="Live Access Status" description="Real-time door, entry and exit monitoring across the campus." />
      <AccessWidget />
    </div>
  );
}
