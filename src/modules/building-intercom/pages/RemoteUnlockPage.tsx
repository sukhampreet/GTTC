import { PageHeader } from '@/components/ui/PageHeader';
import { remoteDoors } from '@/modules/building-intercom/mock';
import { RemoteUnlockPanel } from '@/modules/building-intercom/components/remoteUnlock/RemoteUnlockPanel';

export function RemoteUnlockPage() {
  return (
    <div>
      <PageHeader
        title="Remote Unlock"
        description="Remotely unlock doors linked to outdoor intercom stations. All actions are UI-only mock controls in this sprint."
      />
      <RemoteUnlockPanel doors={remoteDoors} />
    </div>
  );
}
