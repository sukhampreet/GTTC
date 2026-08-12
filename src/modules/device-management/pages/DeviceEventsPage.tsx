import { PageHeader } from '@/components/ui/PageHeader';
import { DeviceEventsTable } from '@/modules/device-management/components/events/DeviceEventsTable';

export function DeviceEventsPage() {
  return (
    <div>
      <PageHeader title="Device Events" description="Device-originated events — offline alerts, sensor faults, firmware notices, and recoveries." />
      <DeviceEventsTable />
    </div>
  );
}
