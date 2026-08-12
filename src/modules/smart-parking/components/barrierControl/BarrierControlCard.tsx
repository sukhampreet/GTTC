import { useState } from 'react';
import { Gauge, Lock, LockOpen, TriangleAlert } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/smart-parking/components/shared/statusTone';
import type { Barrier } from '@/modules/smart-parking/types';

export interface BarrierControlCardProps {
  barrier: Barrier;
}

export function BarrierControlCard({ barrier }: BarrierControlCardProps) {
  const [open, setOpen] = useState(barrier.barrierStatus === 'open');
  const [confirmForceOpen, setConfirmForceOpen] = useState(false);

  return (
    <AppCard className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-text-primary">{barrier.name}</p>
          <p className="truncate text-[11px] text-text-tertiary">{barrier.gateName}</p>
        </div>
        <StatusBadge tone={DEVICE_STATUS_TONE[barrier.gateStatus]}>{DEVICE_STATUS_LABEL[barrier.gateStatus]}</StatusBadge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant={!open ? 'secondary' : 'outline'} size="sm" onClick={() => setOpen(false)} disabled={!open}>
          <Lock className="size-3.5" />
          Close
        </Button>
        <Button variant={open ? 'secondary' : 'outline'} size="sm" onClick={() => setOpen(true)} disabled={open}>
          <LockOpen className="size-3.5" />
          Open
        </Button>
      </div>

      <Button variant="danger" size="sm" onClick={() => setConfirmForceOpen(true)}>
        <TriangleAlert className="size-3.5" />
        Force Open
      </Button>

      <div className="flex items-center justify-between border-t border-border-default pt-2.5 text-[11px] text-text-tertiary">
        <span className="inline-flex items-center gap-1">
          <Gauge className="size-3" />
          Barrier
        </span>
        <StatusBadge tone={open ? 'warning' : 'success'}>{open ? 'Open' : 'Closed'}</StatusBadge>
      </div>

      <ConfirmationDialog
        open={confirmForceOpen}
        title="Confirm Force Open"
        description={`This will immediately force-open "${barrier.name}" at ${barrier.gateName}, bypassing normal ANPR validation. This action is logged.`}
        confirmLabel="Force Open"
        tone="danger"
        onConfirm={() => {
          setOpen(true);
          setConfirmForceOpen(false);
        }}
        onCancel={() => setConfirmForceOpen(false)}
      />
    </AppCard>
  );
}
