import { PageHeader } from '@/components/ui/PageHeader';
import { ConfigurationTabs } from '@/modules/access-control/components/deviceConfig/ConfigurationTabs';

export function DeviceConfigurationPage() {
  return (
    <div>
      <PageHeader
        title="Device Configuration"
        description="Configure access control controllers, readers and network settings. Forms only — no backend calls in this sprint."
      />
      <ConfigurationTabs />
    </div>
  );
}
