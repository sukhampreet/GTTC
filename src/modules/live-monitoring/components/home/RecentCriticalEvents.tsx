import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { liveEvents } from '@/modules/live-monitoring/mock/liveEvents';
import { EVENT_STATUS_LABEL, EVENT_STATUS_TONE } from '@/modules/live-monitoring/components/shared/statusTone';

/** Compact feed of the most recent critical/warning events for the SOC home view. */
export function RecentCriticalEvents() {
  const critical = liveEvents.filter((e) => e.priority !== 'info').slice(0, 6);

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Recent Critical Events</AppCardTitle>
        <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
          <span className="size-1.5 animate-pulse rounded-full bg-danger-500" />
          Live
        </span>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {critical.map((event) => (
            <li key={event.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-text-primary">{event.type}</p>
                <p className="truncate text-[11px] text-text-tertiary">{event.location} · {event.timestamp}</p>
              </div>
              <StatusBadge tone={EVENT_STATUS_TONE[event.status]} className="shrink-0">
                {EVENT_STATUS_LABEL[event.status]}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
