import { useState } from 'react';
import { Siren, DoorOpen, ShieldCheck } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import type { EmergencyDoorState } from '@/modules/access-control/types';

export interface EmergencyPanelProps {
  doors: EmergencyDoorState[];
  lastTrigger: { event: string; time: string; triggeredBy: string };
}

export function EmergencyPanel({ doors, lastTrigger }: EmergencyPanelProps) {
  const [confirmUnlockAll, setConfirmUnlockAll] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState(false);
  const [doorStates, setDoorStates] = useState(doors);

  const anyUnlocked = doorStates.some((d) => d.unlocked);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard className="xl:col-span-2">
        <AppCardHeader>
          <AppCardTitle>Emergency Status</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-4">
          <div
            className={
              anyUnlocked
                ? 'flex items-center gap-3 rounded-(--radius-md) border border-danger-500/30 bg-danger-bg px-4 py-3'
                : 'flex items-center gap-3 rounded-(--radius-md) border border-success-500/30 bg-success-bg px-4 py-3'
            }
          >
            {anyUnlocked ? (
              <Siren className="size-5 text-danger-400" />
            ) : (
              <ShieldCheck className="size-5 text-success-400" />
            )}
            <div>
              <p className="text-[13.5px] font-semibold text-text-primary">
                {anyUnlocked ? 'Emergency Unlock Active' : 'All Doors Operating Normally'}
              </p>
              <p className="text-[11px] text-text-tertiary">
                Last trigger: {lastTrigger.event} · {lastTrigger.time}
              </p>
            </div>
          </div>

          <ul className="divide-y divide-border-default rounded-(--radius-md) border border-border-default">
            {doorStates.map((door) => (
              <li key={door.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-text-primary">{door.doorName}</p>
                  <p className="truncate text-[11px] text-text-tertiary">
                    {door.building} · {door.triggeredBy}
                  </p>
                </div>
                <StatusBadge tone={door.unlocked ? 'danger' : 'success'}>
                  {door.unlocked ? 'Unlocked' : 'Secured'}
                </StatusBadge>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            <Button variant="danger" onClick={() => setConfirmUnlockAll(true)}>
              <Siren className="size-3.5" />
              Trigger Emergency Unlock (All Doors)
            </Button>
            <Button variant="outline" onClick={() => setConfirmRestore(true)}>
              <DoorOpen className="size-3.5" />
              Restore Normal Operation
            </Button>
          </div>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Last Trigger</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-2 text-[12.5px] text-text-secondary">
          <p><span className="text-text-tertiary">Event: </span>{lastTrigger.event}</p>
          <p><span className="text-text-tertiary">Time: </span>{lastTrigger.time}</p>
          <p><span className="text-text-tertiary">Triggered by: </span>{lastTrigger.triggeredBy}</p>
        </AppCardContent>
      </AppCard>

      <ConfirmationDialog
        open={confirmUnlockAll}
        title="Confirm Emergency Unlock — All Doors"
        description="This immediately unlocks every managed door across the facility and bypasses all schedules. This action is logged and audited."
        confirmLabel="Unlock All Doors"
        tone="danger"
        onConfirm={() => {
          setDoorStates((prev) => prev.map((d) => ({ ...d, unlocked: true, triggeredBy: 'Manual Override', triggeredAt: 'Just now' })));
          setConfirmUnlockAll(false);
        }}
        onCancel={() => setConfirmUnlockAll(false)}
      />

      <ConfirmationDialog
        open={confirmRestore}
        title="Restore Normal Operation"
        description="This will re-lock and restore scheduled access control on all doors currently in emergency unlock."
        confirmLabel="Restore"
        onConfirm={() => {
          setDoorStates((prev) => prev.map((d) => ({ ...d, unlocked: false })));
          setConfirmRestore(false);
        }}
        onCancel={() => setConfirmRestore(false)}
      />
    </div>
  );
}
