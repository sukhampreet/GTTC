import { PageHeader } from '@/components/ui/PageHeader';
import { broadcastGroups, broadcastMessagePresets } from '@/modules/fire-emergency/mock';
import { BroadcastPanel } from '@/modules/fire-emergency/components/broadcast/BroadcastPanel';

export function EmergencyBroadcastPage() {
  return (
    <div>
      <PageHeader
        title="Emergency Broadcast"
        description="Send voice announcements to selected zones via the public address network. UI only — no audio is transmitted in this sprint."
      />
      <BroadcastPanel groups={broadcastGroups} messagePresets={broadcastMessagePresets} />
    </div>
  );
}
