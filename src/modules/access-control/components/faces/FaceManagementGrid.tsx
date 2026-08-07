import { FacePreviewCard } from '@/modules/access-control/components/faces/FacePreviewCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import type { FaceRecord } from '@/modules/access-control/types';

export interface FaceManagementGridProps {
  faces: FaceRecord[];
}

export function FaceManagementGrid({ faces }: FaceManagementGridProps) {
  if (faces.length === 0) {
    return <EmptyState title="No face templates found" description="Try adjusting your search or group filter." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {faces.map((face) => (
        <FacePreviewCard key={face.id} face={face} />
      ))}
    </div>
  );
}
