import { useState } from 'react';
import { Lock, LockOpen, DoorOpen, DoorClosed, Siren } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/access-control/components/shared/statusTone';
import type { DoorLiveStatus } from '@/modules/access-control/types';

export interface DoorControlCardProps {
  door: DoorLiveStatus;
}

export function DoorControlCard({ door }: DoorControlCardProps) {
  const [locked, setLocked] = useState(door.lockStatus === 'locked');
  const [open, setOpen] = useState(door.doorStatus === 'open' || door.doorStatus === 'held-open');
  const [confirmEmergency, setConfirmEmergency] = useState(false);

  return (
    <AppCard className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-text-primary">{door.doorName}</p>
          <p className="truncate text-[11px] text-text-tertiary">{door.building} · {door.floor}</p>
        </div>
        <StatusBadge tone={DEVICE_STATUS_TONE[door.controllerStatus]}>
          {DEVICE_STATUS_LABEL[door.controllerStatus]}
        </StatusBadge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant={open ? 'secondary' : 'outline'} size="sm" onClick={() => setOpen(false)} disabled={!open}>
          <DoorClosed className="size-3.5" />
          Close Door
        </Button>
        <Button variant={!open ? 'secondary' : 'outline'} size="sm" onClick={() => setOpen(true)} disabled={open}>
          <DoorOpen className="size-3.5" />
          Open Door
        </Button>
        <Button variant={locked ? 'secondary' : 'outline'} size="sm" onClick={() => setLocked(true)} disabled={locked}>
          <Lock className="size-3.5" />
          Lock
        </Button>
        <Button variant={!locked ? 'secondary' : 'outline'} size="sm" onClick={() => setLocked(false)} disabled={!locked}>
          <LockOpen className="size-3.5" />
          Unlock
        </Button>
      </div>

      <Button variant="danger" size="sm" onClick={() => setConfirmEmergency(true)}>
        <Siren className="size-3.5" />
        Emergency Unlock
      </Button>

      <ConfirmationDialog
        open={confirmEmergency}
        title="Confirm Emergency Unlock"
        description={`This will immediately unlock "${door.doorName}" and bypass its schedule. This action is logged.`}
        confirmLabel="Unlock Door"
        tone="danger"
        onConfirm={() => {
          setLocked(false);
          setOpen(false);
          setConfirmEmergency(false);
        }}
        onCancel={() => setConfirmEmergency(false)}
      />
    </AppCard>
  );
}
