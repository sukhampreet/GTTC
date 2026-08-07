import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { titleCase } from '@/modules/access-control/components/shared/statusTone';
import type { AntiPassbackEvent, AntiPassbackZone } from '@/modules/access-control/types';

export interface AntiPassbackPanelProps {
  zones: AntiPassbackZone[];
  events: AntiPassbackEvent[];
}

export function AntiPassbackPanel({ zones, events }: AntiPassbackPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Enabled Zones &amp; Policies</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {zones.map((zone) => (
              <li key={zone.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-text-primary">{zone.zoneName}</p>
                  <p className="truncate text-[11px] text-text-tertiary">
                    {zone.building} · {titleCase(zone.mode)} mode
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {zone.violationsToday > 0 && (
                    <StatusBadge tone="warning">{zone.violationsToday} today</StatusBadge>
                  )}
                  <StatusBadge tone={zone.enabled ? 'success' : 'neutral'}>
                    {zone.enabled ? 'Enabled' : 'Disabled'}
                  </StatusBadge>
                </div>
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Recent Violation Events</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {events.map((event) => (
              <li key={event.id} className="flex items-start justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-text-primary">{event.eventType}</p>
                  <p className="truncate text-[11px] text-text-tertiary">
                    {event.zone} · {event.user}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[11px] text-text-tertiary">{event.time}</p>
                  <p className="text-[11px] font-medium text-text-secondary">{event.action}</p>
                </div>
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
