import { PageHeader } from '@/components/ui/PageHeader';
import { PTZPanel } from '@/modules/video-surveillance/components/ptz/PTZPanel';

export function PTZControlPage() {
  return (
    <div>
      <PageHeader
        title="PTZ Control"
        description="Pan, tilt, zoom and preset control for PTZ-capable cameras. All controls are UI only — no device backend."
      />
      <PTZPanel />
    </div>
  );
}
