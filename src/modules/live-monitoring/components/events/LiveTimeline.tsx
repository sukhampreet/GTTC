import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { liveEvents } from '@/modules/live-monitoring/mock/liveEvents';
import { EVENT_STATUS_LABEL, EVENT_STATUS_TONE } from '@/modules/live-monitoring/components/shared/statusTone';
import type { StatusTone } from '@/types/common';

const DOT_TONE_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  neutral: 'bg-secondary-500',
};

/** Professional scrolling timeline of live events across every subsystem. */
export function LiveTimeline() {
  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Live Events</AppCardTitle>
        <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
          <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
          Live
        </span>
      </AppCardHeader>
      <AppCardContent className="max-h-[32rem] overflow-y-auto p-0">
        <ol className="relative m-0 list-none space-y-0 p-0">
          {liveEvents.map((event, index) => (
            <li key={event.id} className="relative flex gap-3 px-4 py-3 hover:bg-surface-hover">
              <div className="flex flex-col items-center pt-0.5">
                <span className={cn('size-2 shrink-0 rounded-full', DOT_TONE_CLASSES[event.priority])} />
                {index < liveEvents.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-border-default" aria-hidden="true" />
                )}
              </div>

              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-text-tertiary">{event.timestamp}</span>
                  <StatusBadge tone={EVENT_STATUS_TONE[event.status]} className="shrink-0">
                    {EVENT_STATUS_LABEL[event.status]}
                  </StatusBadge>
                </div>
                <p className="mt-1 truncate text-[13px] font-medium text-text-primary">{event.type}</p>
                <p className="mt-0.5 text-[11px] text-text-tertiary">{event.module} · {event.location}</p>
              </div>
            </li>
          ))}
        </ol>
      </AppCardContent>
    </AppCard>
  );
}
