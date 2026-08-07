import { PageHeader } from '@/components/ui/PageHeader';
import { DeviceStatusCards } from '@/modules/live-monitoring/components/devices/DeviceStatusCards';

export function DeviceStatusPage() {
  return (
    <div>
      <PageHeader title="Device Status" description="Fleet-wide device health across cameras, access, fire, intercom, parking and environment sensors." />
      <DeviceStatusCards />
    </div>
  );
}
