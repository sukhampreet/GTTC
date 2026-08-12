import { LogOut, Gauge, ScanLine, Car, HeartPulse } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, BARRIER_STATUS_TONE, titleCase } from '@/modules/smart-parking/components/shared/statusTone';
import type { ParkingGate } from '@/modules/smart-parking/types';

export interface ExitGatePanelProps {
  gate: ParkingGate;
}

export function ExitGatePanel({ gate }: ExitGatePanelProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Gate Status" value={DEVICE_STATUS_LABEL[gate.gateStatus]} icon={LogOut} tone={DEVICE_STATUS_TONE[gate.gateStatus]} />
        <StatCard label="Barrier Status" value={titleCase(gate.barrierStatus)} icon={Gauge} tone={BARRIER_STATUS_TONE[gate.barrierStatus]} />
        <StatCard label="ANPR Camera" value={DEVICE_STATUS_LABEL[gate.anprStatus]} icon={ScanLine} tone={DEVICE_STATUS_TONE[gate.anprStatus]} hint={gate.anprCameraName} />
        <StatCard label="Gate Health" value={DEVICE_STATUS_LABEL[gate.health]} icon={HeartPulse} tone={DEVICE_STATUS_TONE[gate.health]} />
      </div>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Last Vehicle</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-(--radius-md) bg-info-bg text-info-400">
              <Car className="size-4.5" />
            </div>
            <div>
              <p className="font-mono text-[13px] font-medium text-text-primary">{gate.lastVehicleNumber}</p>
              <p className="text-[11px] text-text-tertiary">Exited {gate.lastVehicleTime}</p>
            </div>
          </div>
          <StatusBadge tone="info">Exit Recorded</StatusBadge>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
