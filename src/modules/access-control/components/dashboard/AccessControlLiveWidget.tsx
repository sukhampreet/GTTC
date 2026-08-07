import { useNavigate } from 'react-router-dom';
import { ArrowRight, DoorClosed, DoorOpen, Lock, LockOpen } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { doorLiveStatus } from '@/modules/access-control/mock';
import { ACCESS_CONTROL_PATHS } from '@/modules/access-control/constants/paths';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/access-control/components/shared/statusTone';

/**
 * Live snapshot of the Access Control module's real door status data,
 * embedded directly on the Dashboard so the module's "live" view is
 * visible without navigating away. Backed by the same mock data the
 * full Live Door Status page renders — not a separate/disconnected
 * placeholder — so the two stay in sync.
 */
export function AccessControlLiveWidget() {
  const navigate = useNavigate();

  const onlineDoors = doorLiveStatus.filter((d) => d.connectionStatus === 'online').length;
  const alarmDoors = doorLiveStatus.filter((d) => d.doorStatus === 'forced' || d.doorStatus === 'held-open').length;
  const preview = doorLiveStatus.slice(0, 5);

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <div className="flex items-center gap-2">
          <AppCardTitle>Access Control — Live Door Status</AppCardTitle>
          <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
            <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
            Live
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`${ROUTES.accessControl}/${ACCESS_CONTROL_PATHS.doorStatus}`)}
        >
          View all
          <ArrowRight className="size-3.5" />
        </Button>
      </AppCardHeader>

      <AppCardContent className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-text-tertiary">Total Doors</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-text-primary">{doorLiveStatus.length}</p>
          </div>
          <div className="rounded-(--radius-md) border border-success-500/30 bg-success-bg px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-success-400">Online</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-success-400">{onlineDoors}</p>
          </div>
          <div className="rounded-(--radius-md) border border-danger-500/30 bg-danger-bg px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-danger-400">Alarms</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-danger-400">{alarmDoors}</p>
          </div>
        </div>

        <ul className="flex-1 divide-y divide-border-default overflow-hidden rounded-(--radius-md) border border-border-default">
          {preview.map((door) => (
            <li key={door.id} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                {door.doorStatus === 'closed' ? (
                  <DoorClosed className="size-3.5 shrink-0 text-text-tertiary" />
                ) : (
                  <DoorOpen className={cn('size-3.5 shrink-0', door.doorStatus === 'forced' ? 'text-danger-400' : 'text-warning-400')} />
                )}
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{door.doorName}</p>
                  <p className="truncate text-[10.5px] text-text-tertiary">{door.building}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {door.lockStatus === 'locked' ? (
                  <Lock className="size-3 text-text-tertiary" />
                ) : (
                  <LockOpen className="size-3 text-warning-400" />
                )}
                <StatusBadge tone={DEVICE_STATUS_TONE[door.connectionStatus]} className="px-1.5 py-0">
                  {DEVICE_STATUS_LABEL[door.connectionStatus]}
                </StatusBadge>
              </div>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
