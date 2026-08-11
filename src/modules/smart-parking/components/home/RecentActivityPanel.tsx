import { LogIn, LogOut } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import { parkingEvents } from '@/modules/smart-parking/mock';

export function RecentActivityPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Recent Vehicle Activity</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {parkingEvents.slice(0, 6).map((event) => {
            const Icon = event.event === 'entry' ? LogIn : LogOut;
            return (
              <li key={event.id} className="flex items-start gap-3 px-4 py-2.5">
                <div
                  className={cn(
                    'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-(--radius-md)',
                    event.event === 'entry' ? 'bg-success-bg text-success-400' : 'bg-info-bg text-info-400',
                  )}
                >
                  <Icon className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-text-primary">{event.vehicleNumber}</p>
                  <p className="truncate text-[11px] text-text-tertiary">
                    {event.gate} · Slot {event.slot} · {event.vehicleType}
                  </p>
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
