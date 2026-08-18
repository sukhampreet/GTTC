import { PageHeader } from '@/components/ui/PageHeader';
import { CameraWall } from '@/modules/live-monitoring/components/cameraWall/CameraWall';

export function CameraWallPage() {
  return (
    <div>
      <PageHeader
        title="Camera Wall"
        description="Enterprise CCTV wall with switchable multi-camera layouts. CP PLUS Camera 01 streams live via the backend."
      />
      <CameraWall />
    </div>
  );
}
