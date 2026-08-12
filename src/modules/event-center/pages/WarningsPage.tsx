import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/ui/PageHeader';
import { ROUTES } from '@/constants/routes';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';
import { events } from '@/modules/event-center/mock/events';
import { EventsTable } from '@/modules/event-center/components/events/EventsTable';

export function WarningsPage() {
  const navigate = useNavigate();
  const warnings = events.filter((e) => e.severity === 'warning');

  return (
    <div>
      <PageHeader
        title="Warnings"
        description="Device offline notices, low storage, sensor and network warnings across all connected subsystems."
      />
      <EventsTable
        events={warnings}
        emptyTitle="No warnings"
        emptyDescription="No warning-level events match the current search."
        onSelect={(event) => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.details}?id=${event.id}`)}
      />
    </div>
  );
}
