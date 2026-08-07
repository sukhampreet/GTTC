import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { controllerRecords } from '@/modules/access-control/mock';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/access-control/components/shared/statusTone';

export function ControllerStatusPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Controller Status</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {controllerRecords.map((controller) => (
            <li key={controller.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-text-primary">{controller.name}</p>
                <p className="truncate text-[11px] text-text-tertiary">
                  {controller.building} · {controller.ipAddress} · {controller.linkedDoors} doors
                </p>
              </div>
              <StatusBadge tone={DEVICE_STATUS_TONE[controller.status]}>
                {DEVICE_STATUS_LABEL[controller.status]}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
