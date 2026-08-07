import { DoorClosed, DoorOpen, Lock, LockOpen, AlertTriangle } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { StatusTone } from '@/types/common';
import type { DoorLiveStatus } from '@/modules/access-control/types';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/access-control/components/shared/statusTone';
import { cn } from '@/utils/cn';

const DOOR_STATE_META: Record<DoorLiveStatus['doorStatus'], { label: string; tone: StatusTone; icon: typeof DoorOpen }> = {
  closed: { label: 'Closed', tone: 'neutral', icon: DoorClosed },
  open: { label: 'Open', tone: 'info', icon: DoorOpen },
  'held-open': { label: 'Held Open', tone: 'warning', icon: AlertTriangle },
  forced: { label: 'Forced Open', tone: 'danger', icon: AlertTriangle },
};

export interface DoorStatusGridProps {
  doors: DoorLiveStatus[];
}

export function DoorStatusGrid({ doors }: DoorStatusGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {doors.map((door) => {
        const state = DOOR_STATE_META[door.doorStatus];
        const StateIcon = state.icon;
        return (
          <AppCard key={door.id} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-text-primary">{door.doorName}</p>
                <p className="truncate text-[11px] text-text-tertiary">
                  {door.building} · {door.floor}
                </p>
              </div>
              <span
                className={cn(
                  'flex size-2 shrink-0 rounded-full',
                  door.connectionStatus === 'online' && 'bg-success-500',
                  door.connectionStatus === 'offline' && 'bg-danger-500',
                  door.connectionStatus === 'warning' && 'bg-warning-500',
                )}
                aria-hidden="true"
                title={`Connection: ${DEVICE_STATUS_LABEL[door.connectionStatus]}`}
              />
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-1.5">
              <StateIcon
                className={cn(
                  'size-3.5',
                  state.tone === 'danger' && 'text-danger-400',
                  state.tone === 'warning' && 'text-warning-400',
                  state.tone === 'neutral' && 'text-text-tertiary',
                )}
              />
              <span className="text-[12px] font-medium text-text-secondary">{state.label}</span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-text-tertiary">
                {door.lockStatus === 'locked' ? <Lock className="size-3" /> : <LockOpen className="size-3" />}
                {door.lockStatus === 'locked' ? 'Locked' : 'Unlocked'}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <dt className="text-text-tertiary">Controller</dt>
                <dd>
                  <StatusBadge tone={DEVICE_STATUS_TONE[door.controllerStatus]} className="px-1.5 py-0">
                    {DEVICE_STATUS_LABEL[door.controllerStatus]}
                  </StatusBadge>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-text-tertiary">Reader</dt>
                <dd>
                  <StatusBadge tone={DEVICE_STATUS_TONE[door.readerStatus]} className="px-1.5 py-0">
                    {DEVICE_STATUS_LABEL[door.readerStatus]}
                  </StatusBadge>
                </dd>
              </div>
            </dl>

            <p className="mt-2.5 text-[11px] text-text-tertiary">Last activity: {door.lastActivity}</p>
          </AppCard>
        );
      })}
    </div>
  );
}
