import { PageHeader } from '@/components/ui/PageHeader';
import { DeviceInventoryTable } from '@/modules/device-management/components/inventory/DeviceInventoryTable';

export function DeviceInventoryPage() {
  return (
    <div>
      <PageHeader title="Device Inventory" description="Complete inventory of every connected device across the platform." />
      <DeviceInventoryTable />
    </div>
  );
}
