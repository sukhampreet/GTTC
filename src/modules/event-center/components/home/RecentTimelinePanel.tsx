import { useNavigate } from 'react-router-dom';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';
import { events } from '@/modules/event-center/mock/events';
import { EVENT_STATUS_TONE, titleCase } from '@/modules/event-center/components/shared/statusTone';
import type { StatusTone } from '@/types/common';

const DOT_TONE_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  neutral: 'bg-secondary-500',
};

const SEVERITY_DOT_TONE: Record<string, StatusTone> = {
  critical: 'danger',
  high: 'danger',
  warning: 'warning',
  info: 'info',
};

export function RecentTimelinePanel() {
  const navigate = useNavigate();
  const recent = events.slice(0, 8);

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Recent Event Timeline</AppCardTitle>
        <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
          <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
          Live
        </span>
      </AppCardHeader>
      <AppCardContent className="max-h-96 overflow-y-auto p-0">
        <ol className="relative m-0 list-none space-y-0 p-0">
          {recent.map((event, index) => (
            <li
              key={event.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.details}?id=${event.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.details}?id=${event.id}`);
              }}
              className="relative flex cursor-pointer gap-3 px-4 py-3 hover:bg-surface-hover"
            >
              <div className="flex flex-col items-center pt-0.5">
                <span className={cn('size-2 shrink-0 rounded-full', DOT_TONE_CLASSES[SEVERITY_DOT_TONE[event.severity]])} />
                {index < recent.length - 1 && <span className="mt-1 w-px flex-1 bg-border-default" aria-hidden="true" />}
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-text-tertiary">{event.timestamp}</span>
                  <StatusBadge tone={EVENT_STATUS_TONE[event.status]} className="shrink-0">
                    {titleCase(event.status)}
                  </StatusBadge>
                </div>
                <p className="mt-1 truncate text-[13px] font-medium text-text-primary">{event.eventType}</p>
                <p className="mt-0.5 text-[11px] text-text-tertiary">
                  {event.sourceModule} · {event.location}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </AppCardContent>
      <div className="border-t border-border-default p-2 text-center">
        <Button variant="ghost" size="sm" onClick={() => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.timeline}`)}>
          Open full timeline
        </Button>
      </div>
    </AppCard>
  );
}
