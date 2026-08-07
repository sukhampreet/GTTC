import { PageHeader } from '@/components/ui/PageHeader';
import { recordingEntries, storageUsage } from '@/modules/building-intercom/mock';
import { StorageUsagePanel } from '@/modules/building-intercom/components/recording/StorageUsagePanel';
import { RecordingTable } from '@/modules/building-intercom/components/recording/RecordingTable';

export function RecordingPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Recording" description="Call recordings and snapshots captured across all intercom stations." />
      <StorageUsagePanel usage={storageUsage} />
      <RecordingTable recordings={recordingEntries} />
    </div>
  );
}
