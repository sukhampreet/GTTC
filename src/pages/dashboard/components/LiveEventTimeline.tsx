import { useNavigate } from 'react-router-dom';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { ACCESS_CONTROL_PATHS } from '@/modules/access-control/constants/paths';
import { timelineEvents } from '@/mock/dashboard';
import type { TimelineStatus } from '@/types/dashboard';
import type { StatusTone } from '@/types/common';

const STATUS_LABEL: Record<TimelineStatus, string> = {
  open: 'Open',
  acknowledged: 'Acknowledged',
  resolved: 'Resolved',
};

const STATUS_TONE: Record<TimelineStatus, StatusTone> = {
  open: 'danger',
  acknowledged: 'warning',
  resolved: 'success',
};

const DOT_TONE_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  neutral: 'bg-secondary-500',
};

export function LiveEventTimeline() {
  const navigate = useNavigate();

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Live Event Timeline</AppCardTitle>
        <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
          <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
          Live
        </span>
      </AppCardHeader>
      <AppCardContent className="max-h-96 overflow-y-auto p-0">
        <ol className="relative m-0 list-none space-y-0 p-0">
          {timelineEvents.map((event, index) => {
            const isAccessControl = event.module === 'Access Control';
            return (
              <li
                key={event.id}
                role={isAccessControl ? 'button' : undefined}
                tabIndex={isAccessControl ? 0 : undefined}
                onClick={
                  isAccessControl
                    ? () => navigate(`${ROUTES.accessControl}/${ACCESS_CONTROL_PATHS.logs}`)
                    : undefined
                }
                onKeyDown={
                  isAccessControl
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') navigate(`${ROUTES.accessControl}/${ACCESS_CONTROL_PATHS.logs}`);
                      }
                    : undefined
                }
                className={cn(
                  'relative flex gap-3 px-4 py-3 hover:bg-surface-hover',
                  isAccessControl && 'cursor-pointer',
                )}
              >
                <div className="flex flex-col items-center pt-0.5">
                  <span className={cn('size-2 shrink-0 rounded-full', DOT_TONE_CLASSES[event.priority])} />
                  {index < timelineEvents.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-border-default" aria-hidden="true" />
                  )}
                </div>

                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-text-tertiary">{event.timestamp}</span>
                    <StatusBadge tone={STATUS_TONE[event.status]} className="shrink-0">
                      {STATUS_LABEL[event.status]}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 truncate text-[13px] font-medium text-text-primary">{event.title}</p>
                  <p className="mt-0.5 text-[11px] text-text-tertiary">{event.module}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </AppCardContent>
    </AppCard>
  );
}
