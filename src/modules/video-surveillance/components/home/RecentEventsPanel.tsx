import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { recentEvents } from '@/modules/video-surveillance/mock';

export function RecentEventsPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Recent Events</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {recentEvents.map((event) => (
            <li key={event.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-text-primary">{event.event}</p>
                <p className="truncate text-[11px] text-text-tertiary">{event.camera}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <StatusBadge tone={event.tone} className="px-1.5 py-0">
                  {event.type}
                </StatusBadge>
                <span className="text-[11px] text-text-tertiary">{event.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
