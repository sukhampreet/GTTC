import { PageHeader } from '@/components/ui/PageHeader';
import { ScheduleGrid } from '@/modules/video-surveillance/components/schedule/ScheduleGrid';

export function RecordingSchedulePage() {
  return (
    <div>
      <PageHeader
        title="Recording Schedule"
        description="Weekly time-block recording policies applied per camera group. No backend — configuration only."
      />
      <ScheduleGrid />
    </div>
  );
}
