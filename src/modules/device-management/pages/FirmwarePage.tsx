import { PageHeader } from '@/components/ui/PageHeader';
import { FirmwareTable } from '@/modules/device-management/components/firmware/FirmwareTable';

export function FirmwarePage() {
  return (
    <div>
      <PageHeader title="Firmware" description="Track and schedule firmware updates across the device fleet. UI only — no firmware is pushed to devices." />
      <FirmwareTable />
    </div>
  );
}
