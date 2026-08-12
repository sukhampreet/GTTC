import { PageHeader } from '@/components/ui/PageHeader';
import { events } from '@/modules/event-center/mock/events';
import { EventReplayPanel } from '@/modules/event-center/components/replay/EventReplayPanel';

export function EventReplayPage() {
  return (
    <div>
      <PageHeader
        title="Event Replay"
        description="Review the timeline and source context of an event. Video playback is not available in this environment."
      />
      <EventReplayPanel events={events} />
    </div>
  );
}
