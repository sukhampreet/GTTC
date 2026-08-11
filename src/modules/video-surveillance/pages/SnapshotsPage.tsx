import { PageHeader } from '@/components/ui/PageHeader';
import { snapshotRecords } from '@/modules/video-surveillance/mock';
import { SnapshotGallery } from '@/modules/video-surveillance/components/snapshots/SnapshotGallery';

export function SnapshotsPage() {
  return (
    <div>
      <PageHeader
        title="Snapshots"
        description={`${snapshotRecords.length} captured snapshots across all cameras. Professional gallery placeholder — mock data only.`}
      />
      <SnapshotGallery />
    </div>
  );
}
