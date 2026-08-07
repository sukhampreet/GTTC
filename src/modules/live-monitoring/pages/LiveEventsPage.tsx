import { PageHeader } from '@/components/ui/PageHeader';
import { LiveTimeline } from '@/modules/live-monitoring/components/events/LiveTimeline';

export function LiveEventsPage() {
  return (
    <div>
      <PageHeader title="Live Events" description="Professional scrolling timeline of real-time events across every connected subsystem." />
      <LiveTimeline />
    </div>
  );
}
