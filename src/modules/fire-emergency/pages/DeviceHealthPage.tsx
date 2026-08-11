import { PageHeader } from '@/components/ui/PageHeader';
import { deviceHealthCategories } from '@/modules/fire-emergency/mock';
import { DeviceHealthCards } from '@/modules/fire-emergency/components/deviceHealth/DeviceHealthCards';

export function DeviceHealthPage() {
  return (
    <div>
      <PageHeader title="Device Health" description="Online, offline and maintenance status across every fire & emergency device category." />
      <DeviceHealthCards categories={deviceHealthCategories} />
    </div>
  );
}
