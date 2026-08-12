import { PageHeader } from '@/components/ui/PageHeader';
import { DeviceGroupsTable } from '@/modules/device-management/components/groups/DeviceGroupsTable';

export function DeviceGroupsPage() {
  return (
    <div>
      <PageHeader title="Device Groups" description="Devices organized by subsystem — cameras, access controllers, fire devices, and more." />
      <DeviceGroupsTable />
    </div>
  );
}
