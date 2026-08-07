import { useState } from 'react';
import { Lock, LockOpen } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/building-intercom/components/shared/statusTone';
import type { RemoteDoor } from '@/modules/building-intercom/types';

export interface RemoteDoorCardProps {
  door: RemoteDoor;
}

export function RemoteDoorCard({ door }: RemoteDoorCardProps) {
  const [locked, setLocked] = useState(door.lockStatus === 'locked');
  const [confirmUnlock, setConfirmUnlock] = useState(false);

  return (
    <AppCard className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-text-primary">{door.doorName}</p>
          <p className="truncate text-[11px] text-text-tertiary">{door.station} · {door.building}</p>
        </div>
        <StatusBadge tone={DEVICE_STATUS_TONE[door.onlineStatus]}>{DEVICE_STATUS_LABEL[door.onlineStatus]}</StatusBadge>
      </div>

      <div className="flex items-center justify-between rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-text-secondary">
          {locked ? <Lock className="size-3.5" /> : <LockOpen className="size-3.5" />}
          {locked ? 'Locked' : 'Unlocked'}
        </span>
        <span className="text-[11px] text-text-tertiary">Door Health</span>
        <StatusBadge tone={door.doorHealth} className="px-1.5 py-0">
          {door.doorHealth === 'success' ? 'Healthy' : door.doorHealth === 'warning' ? 'Degraded' : 'Critical'}
        </StatusBadge>
      </div>

      {locked ? (
        <Button variant="primary" size="sm" onClick={() => setConfirmUnlock(true)}>
          <LockOpen className="size-3.5" />
          Unlock Door
        </Button>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setLocked(true)}>
          <Lock className="size-3.5" />
          Re-lock Door
        </Button>
      )}

      <ConfirmationDialog
        open={confirmUnlock}
        title="Confirm Remote Unlock"
        description={`This will remotely unlock "${door.doorName}" via ${door.station}. This action is logged.`}
        confirmLabel="Unlock Door"
        onConfirm={() => {
          setLocked(false);
          setConfirmUnlock(false);
        }}
        onCancel={() => setConfirmUnlock(false)}
      />
    </AppCard>
  );
}
