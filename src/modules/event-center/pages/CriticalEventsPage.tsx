import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/ui/PageHeader';
import { ROUTES } from '@/constants/routes';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';
import { events } from '@/modules/event-center/mock/events';
import { EventsTable } from '@/modules/event-center/components/events/EventsTable';

export function CriticalEventsPage() {
  const navigate = useNavigate();
  const critical = events.filter((e) => e.severity === 'critical' || e.severity === 'high');

  return (
    <div>
      <PageHeader
        title="Critical Events"
        description="Fire alarms, intrusion detections, unauthorized access and other high-severity events requiring immediate attention."
      />
      <EventsTable
        events={critical}
        emptyTitle="No critical events"
        emptyDescription="No critical or high-priority events match the current search."
        onSelect={(event) => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.details}?id=${event.id}`)}
      />
    </div>
  );
}
