import { PageHeader } from '@/components/ui/PageHeader';
import { DeviceDetailPanel } from '@/modules/device-management/components/details/DeviceDetailPanel';

export function DeviceDetailsPage() {
  return (
    <div>
      <PageHeader title="Device Details" description="Select a device to inspect its network, health, firmware, and recent activity." />
      <DeviceDetailPanel />
    </div>
  );
}
