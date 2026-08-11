import { Camera, PlusCircle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/data/StatCard';
import { cameraRecords } from '@/modules/video-surveillance/mock';
import { CameraTable } from '@/modules/video-surveillance/components/cameraList/CameraTable';

export function CameraListPage() {
  const online = cameraRecords.filter((c) => c.status === 'online').length;
  const offline = cameraRecords.filter((c) => c.status === 'offline').length;
  const aiEnabled = cameraRecords.filter((c) => c.aiEnabled).length;

  return (
    <div>
      <PageHeader
        title="Camera List"
        description="Complete camera inventory with connectivity, recording and firmware detail."
        actions={
          <Button size="sm">
            <PlusCircle className="size-3.5" />
            Add Camera
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Cameras" value={cameraRecords.length} icon={Camera} tone="neutral" />
        <StatCard label="Online" value={online} icon={Camera} tone="success" />
        <StatCard label="Offline" value={offline} icon={Camera} tone="danger" />
        <StatCard label="AI Enabled" value={aiEnabled} icon={Camera} tone="info" />
      </div>

      <CameraTable cameras={cameraRecords} />
    </div>
  );
}
