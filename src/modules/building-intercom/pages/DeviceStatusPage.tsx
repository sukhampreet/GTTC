import { PageHeader } from '@/components/ui/PageHeader';
import { deviceWarnings } from '@/modules/building-intercom/mock';
import { DeviceStatusCards } from '@/modules/building-intercom/components/deviceStatus/DeviceStatusCards';
import { DeviceWarningsPanel } from '@/modules/building-intercom/components/deviceStatus/DeviceWarningsPanel';

export function DeviceStatusPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Device Status" description="Health, connectivity and signal quality across all indoor and outdoor intercom devices." />
      <DeviceStatusCards />
      <DeviceWarningsPanel warnings={deviceWarnings} />
    </div>
  );
}
