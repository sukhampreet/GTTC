import { PageHeader } from '@/components/ui/PageHeader';
import { MaintenanceTable } from '@/modules/device-management/components/maintenance/MaintenanceTable';

export function MaintenancePage() {
  return (
    <div>
      <PageHeader title="Maintenance" description="Scheduled, in-progress, and overdue maintenance work across the device fleet." />
      <MaintenanceTable />
    </div>
  );
}
