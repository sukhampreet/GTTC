import { PageHeader } from '@/components/ui/PageHeader';
import { CameraWall } from '@/modules/live-monitoring/components/cameraWall/CameraWall';

export function CameraWallPage() {
  return (
    <div>
      <PageHeader title="Camera Wall" description="Enterprise CCTV wall with switchable multi-camera layouts." />
      <CameraWall />
    </div>
  );
}
