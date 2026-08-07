import { PageHeader } from '@/components/ui/PageHeader';
import { ConfigurationTabs } from '@/modules/building-intercom/components/configuration/ConfigurationTabs';

export function ConfigurationPage() {
  return (
    <div>
      <PageHeader
        title="Configuration"
        description="Configure intercom stations, network, audio/video and recording settings. Forms only — no backend calls in this sprint."
      />
      <ConfigurationTabs />
    </div>
  );
}
