import { useNavigate } from 'react-router-dom';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { DEVICE_MANAGEMENT_PATHS } from '@/modules/device-management/constants/paths';
import { deviceEvents } from '@/modules/device-management/mock/deviceEvents';
import { DEVICE_EVENT_SEVERITY_TONE, titleCase } from '@/modules/device-management/components/shared/statusTone';

export function RecentDeviceEventsPanel() {
  const navigate = useNavigate();
  const recent = deviceEvents.slice(0, 6);

  return (
    <AppCard className="flex h-full flex-col xl:col-span-2">
      <AppCardHeader>
        <AppCardTitle>Recent Device Events</AppCardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate(`${ROUTES.deviceManagement}/${DEVICE_MANAGEMENT_PATHS.events}`)}>
          View all
        </Button>
      </AppCardHeader>
      <AppCardContent className="max-h-96 space-y-2 overflow-y-auto">
        {recent.map((event) => (
          <div key={event.id} className="rounded-(--radius-md) border border-border-default bg-surface-raised p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <StatusBadge tone={DEVICE_EVENT_SEVERITY_TONE[event.severity]}>{titleCase(event.severity)}</StatusBadge>
                <span className="text-[13px] font-medium text-text-primary">{event.device}</span>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-text-tertiary">{event.timestamp.split(' ')[1]}</span>
            </div>
            <p className="mt-1.5 text-[12px] text-text-secondary">{event.event}</p>
          </div>
        ))}
      </AppCardContent>
    </AppCard>
  );
}
