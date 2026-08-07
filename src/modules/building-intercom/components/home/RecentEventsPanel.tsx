import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import { recentEvents } from '@/modules/building-intercom/mock';
import type { StatusTone } from '@/types/common';

const ICON_BY_TONE: Record<StatusTone, typeof AlertTriangle> = {
  danger: ShieldAlert,
  warning: AlertTriangle,
  info: Info,
  success: Info,
  neutral: Info,
};

const COLOR_BY_TONE: Record<StatusTone, string> = {
  danger: 'text-danger-400 bg-danger-bg',
  warning: 'text-warning-400 bg-warning-bg',
  info: 'text-info-400 bg-info-bg',
  success: 'text-success-400 bg-success-bg',
  neutral: 'text-text-secondary bg-surface-hover',
};

export function RecentEventsPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Recent Events</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {recentEvents.map((event) => {
            const Icon = ICON_BY_TONE[event.tone];
            return (
              <li key={event.id} className="flex items-start gap-3 px-4 py-2.5">
                <div className={cn('mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-(--radius-md)', COLOR_BY_TONE[event.tone])}>
                  <Icon className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-text-primary">{event.title}</p>
                  <p className="truncate text-[11px] text-text-tertiary">{event.description}</p>
                </div>
                <span className="shrink-0 text-[11px] text-text-tertiary">{event.timestamp}</span>
              </li>
            );
          })}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
