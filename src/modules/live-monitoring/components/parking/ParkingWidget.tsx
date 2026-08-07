import { ParkingSquare, ParkingCircle, LogIn, LogOut, Car } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { parkingStatusSnapshot } from '@/modules/live-monitoring/mock/parking';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/live-monitoring/components/shared/statusTone';

/** Live parking occupancy and gate/barrier status panel. */
export function ParkingWidget() {
  const snapshot = parkingStatusSnapshot;
  const occupancyPct = Math.round((snapshot.occupiedSlots / snapshot.totalSlots) * 100);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Occupied Slots" value={snapshot.occupiedSlots} icon={ParkingSquare} tone="warning" />
        <StatCard label="Available Slots" value={snapshot.availableSlots} icon={ParkingCircle} tone="success" />
        <StatCard label="Current Vehicles" value={snapshot.currentVehicles} icon={Car} tone="info" hint={`${occupancyPct}% occupancy`} />
        <StatCard label="Total Capacity" value={snapshot.totalSlots} icon={ParkingSquare} tone="neutral" />
      </div>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Entry / Exit Gates &amp; Barrier Status</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {snapshot.gates.map((gate) => (
              <li key={gate.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  {gate.type === 'entry' ? (
                    <LogIn className="size-3.5 text-text-tertiary" />
                  ) : (
                    <LogOut className="size-3.5 text-text-tertiary" />
                  )}
                  <p className="text-[12.5px] font-medium text-text-primary">{gate.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('text-[11px] font-medium', gate.barrierStatus === 'open' ? 'text-warning-400' : 'text-text-tertiary')}>
                    Barrier {gate.barrierStatus === 'open' ? 'Open' : 'Closed'}
                  </span>
                  <StatusBadge tone={DEVICE_STATUS_TONE[gate.status]}>{DEVICE_STATUS_LABEL[gate.status]}</StatusBadge>
                </div>
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
