import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/ui/PageHeader';
import { ROUTES } from '@/constants/routes';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';
import { events } from '@/modules/event-center/mock/events';
import { EventsTable } from '@/modules/event-center/components/events/EventsTable';

export function InformationPage() {
  const navigate = useNavigate();
  const info = events.filter((e) => e.severity === 'info');

  return (
    <div>
      <PageHeader
        title="Information"
        description="Routine informational events — logins, recordings, access grants, backups and system status changes."
      />
      <EventsTable
        events={info}
        emptyTitle="No informational events"
        emptyDescription="No informational events match the current search."
        onSelect={(event) => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.details}?id=${event.id}`)}
      />
    </div>
  );
}
