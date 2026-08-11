import { PageHeader } from '@/components/ui/PageHeader';
import { eventLogs } from '@/modules/fire-emergency/mock';
import { EventLogsTable } from '@/modules/fire-emergency/components/eventLogs/EventLogsTable';

export function EventLogsPage() {
  return (
    <div>
      <PageHeader title="Event Logs" description="Full event trail across fire panels, sensors, MCPs and broadcast systems." />
      <EventLogsTable logs={eventLogs} />
    </div>
  );
}
