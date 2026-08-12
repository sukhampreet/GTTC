import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { cn } from '@/utils/cn';
import { EVENT_SEVERITY_TONE, EVENT_STATUS_TONE, titleCase } from '@/modules/event-center/components/shared/statusTone';
import type { EventItem } from '@/modules/event-center/types';

export interface EventTimelineListProps {
  events: EventItem[];
}

export function EventTimelineList({ events }: EventTimelineListProps) {
  if (events.length === 0) {
    return (
      <AppCard>
        <EmptyState title="No events in range" description="No events match the selected filters." />
      </AppCard>
    );
  }

  return (
    <AppCard className="overflow-hidden">
      <ol className="relative m-0 list-none space-y-0 p-0">
        {events.map((event, index) => (
          <li key={event.id} className="relative flex gap-4 border-b border-border-default px-4 py-3.5 last:border-0 hover:bg-surface-hover">
            <div className="flex w-32 shrink-0 flex-col items-end pt-0.5">
              <span className="font-mono text-[11.5px] text-text-secondary">{event.timestamp.split(' ')[1]}</span>
              <span className="text-[10px] text-text-tertiary">{event.timestamp.split(' ')[0]}</span>
            </div>

            <div className="flex flex-col items-center pt-1">
              <span
                className={cn(
                  'size-2.5 shrink-0 rounded-full border-2 border-surface',
                  event.severity === 'critical' || event.severity === 'high'
                    ? 'bg-danger-500'
                    : event.severity === 'warning'
                      ? 'bg-warning-500'
                      : 'bg-info-500',
                )}
              />
              {index < events.length - 1 && <span className="mt-1 w-px flex-1 bg-border-default" aria-hidden="true" />}
            </div>

            <div className="min-w-0 flex-1 pb-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-text-tertiary">{event.id}</span>
                  <StatusBadge tone={EVENT_SEVERITY_TONE[event.severity]}>{titleCase(event.severity)}</StatusBadge>
                </div>
                <StatusBadge tone={EVENT_STATUS_TONE[event.status]} dot={false}>
                  {titleCase(event.status)}
                </StatusBadge>
              </div>
              <p className="mt-1 text-[13px] font-medium text-text-primary">{event.eventType}</p>
              <p className="mt-0.5 text-[11.5px] text-text-tertiary">
                {event.sourceModule} · {event.device} · {event.location}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </AppCard>
  );
}
