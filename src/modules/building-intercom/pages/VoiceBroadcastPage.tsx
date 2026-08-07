import { PageHeader } from '@/components/ui/PageHeader';
import { broadcastGroups, broadcastDevices, broadcastHistory } from '@/modules/building-intercom/mock';
import { BroadcastPanel } from '@/modules/building-intercom/components/voiceBroadcast/BroadcastPanel';
import { BroadcastHistoryList } from '@/modules/building-intercom/components/voiceBroadcast/BroadcastHistoryList';

export function VoiceBroadcastPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Voice Broadcast"
        description="Send live or scheduled announcements to indoor and outdoor intercom stations. UI-only in this sprint."
      />
      <BroadcastPanel groups={broadcastGroups} devices={broadcastDevices} />
      <BroadcastHistoryList history={broadcastHistory} />
    </div>
  );
}
