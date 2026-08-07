import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DoorControlCard } from '@/modules/access-control/components/doorControl/DoorControlCard';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/access-control/components/shared/statusTone';
import type { ControllerRecord, DoorLiveStatus } from '@/modules/access-control/types';

export interface DoorControlPanelProps {
  doors: DoorLiveStatus[];
  controllers: ControllerRecord[];
}

export function DoorControlPanel({ doors, controllers }: DoorControlPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-3">
        {doors.map((door) => (
          <DoorControlCard key={door.id} door={door} />
        ))}
      </div>

      <AppCard className="h-fit">
        <AppCardHeader>
          <AppCardTitle>Controller Health</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {controllers.map((controller) => (
              <li key={controller.id} className="flex items-center justify-between gap-2 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{controller.name}</p>
                  <p className="truncate text-[11px] text-text-tertiary">{controller.firmware}</p>
                </div>
                <StatusBadge tone={DEVICE_STATUS_TONE[controller.status]}>
                  {DEVICE_STATUS_LABEL[controller.status]}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
