import { useNavigate } from 'react-router-dom';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';
import { events } from '@/modules/event-center/mock/events';
import { EVENT_STATUS_TONE, titleCase } from '@/modules/event-center/components/shared/statusTone';

export function CriticalEventsPanel() {
  const navigate = useNavigate();
  const critical = events.filter((e) => e.severity === 'critical').slice(0, 6);

  return (
    <AppCard className="flex h-full flex-col xl:col-span-2">
      <AppCardHeader>
        <AppCardTitle>Critical Event Panel</AppCardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.critical}`)}>
          View all
        </Button>
      </AppCardHeader>
      <AppCardContent className="max-h-96 space-y-2 overflow-y-auto">
        {critical.map((event) => (
          <div
            key={event.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.details}?id=${event.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.details}?id=${event.id}`);
            }}
            className="cursor-pointer rounded-(--radius-md) border border-border-default bg-surface-raised p-3 transition-colors hover:border-primary-500/60 hover:bg-surface-hover"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <StatusBadge tone="danger">Critical</StatusBadge>
                <span className="font-mono text-[11px] text-text-tertiary">{event.id}</span>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-text-tertiary">{event.timestamp.split(' ')[1]}</span>
            </div>
            <p className="mt-2 text-[13px] font-medium text-text-primary">{event.eventType}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="truncate text-[11px] text-text-tertiary">
                {event.sourceModule} · {event.location}
              </p>
              <StatusBadge tone={EVENT_STATUS_TONE[event.status]} dot={false} className="shrink-0">
                {titleCase(event.status)}
              </StatusBadge>
            </div>
          </div>
        ))}
      </AppCardContent>
    </AppCard>
  );
}
