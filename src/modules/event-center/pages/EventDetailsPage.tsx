import { useSearchParams } from 'react-router-dom';

import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { events } from '@/modules/event-center/mock/events';
import { EventDetailPanel } from '@/modules/event-center/components/details/EventDetailPanel';
import { EVENT_SEVERITY_TONE, titleCase } from '@/modules/event-center/components/shared/statusTone';

export function EventDetailsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('id') ?? events[0]?.id;
  const selectedEvent = events.find((e) => e.id === selectedId) ?? events[0];

  return (
    <div>
      <PageHeader title="Event Details" description="Select an event from the list to inspect its full record, related events and history." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <AppCard className="max-h-[560px] overflow-y-auto">
          <ul className="m-0 list-none divide-y divide-border-default p-0">
            {events.slice(0, 25).map((event) => (
              <li key={event.id}>
                <button
                  onClick={() => setSearchParams({ id: event.id })}
                  className={cn(
                    'w-full px-3 py-2.5 text-left transition-colors hover:bg-surface-hover',
                    event.id === selectedEvent?.id && 'bg-primary-500/10',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-text-tertiary">{event.id}</span>
                    <StatusBadge tone={EVENT_SEVERITY_TONE[event.severity]} dot={false}>
                      {titleCase(event.severity)}
                    </StatusBadge>
                  </div>
                  <p className="mt-0.5 truncate text-[12.5px] font-medium text-text-primary">{event.eventType}</p>
                  <p className="truncate text-[11px] text-text-tertiary">{event.location}</p>
                </button>
              </li>
            ))}
          </ul>
        </AppCard>

        {selectedEvent ? (
          <EventDetailPanel event={selectedEvent} />
        ) : (
          <AppCard className="p-8 text-center text-[13px] text-text-tertiary">Select an event to view its details.</AppCard>
        )}
      </div>
    </div>
  );
}
