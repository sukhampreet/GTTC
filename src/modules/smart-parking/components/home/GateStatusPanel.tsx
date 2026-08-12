import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { parkingGates } from '@/modules/smart-parking/mock';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, titleCase } from '@/modules/smart-parking/components/shared/statusTone';

export function GateStatusPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Gate Status</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {parkingGates.map((gate) => (
            <li key={gate.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-text-primary">{gate.name}</p>
                <p className="truncate text-[11px] text-text-tertiary">
                  {titleCase(gate.direction)} · Barrier {titleCase(gate.barrierStatus)} · {gate.anprCameraName}
                </p>
              </div>
              <StatusBadge tone={DEVICE_STATUS_TONE[gate.gateStatus]}>{DEVICE_STATUS_LABEL[gate.gateStatus]}</StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
