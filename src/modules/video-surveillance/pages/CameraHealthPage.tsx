import { PageHeader } from '@/components/ui/PageHeader';
import { HealthCards } from '@/modules/video-surveillance/components/cameraHealth/HealthCards';
import { SystemResourcePanel } from '@/modules/video-surveillance/components/cameraHealth/SystemResourcePanel';
import { HealthCharts } from '@/modules/video-surveillance/components/cameraHealth/HealthCharts';

export function CameraHealthPage() {
  return (
    <div>
      <PageHeader
        title="Camera Health"
        description="Fleet-wide diagnostics covering connectivity, resource utilisation and storage integrity."
      />

      <div className="space-y-4">
        <HealthCards />
        <SystemResourcePanel />
        <HealthCharts />
      </div>
    </div>
  );
}
