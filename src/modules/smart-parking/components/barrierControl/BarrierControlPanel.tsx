import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { BarrierControlCard } from '@/modules/smart-parking/components/barrierControl/BarrierControlCard';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/smart-parking/components/shared/statusTone';
import type { Barrier } from '@/modules/smart-parking/types';

export interface BarrierControlPanelProps {
  entryBarriers: Barrier[];
  exitBarriers: Barrier[];
}

export function BarrierControlPanel({ entryBarriers, exitBarriers }: BarrierControlPanelProps) {
  const allBarriers = [...entryBarriers, ...exitBarriers];

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      <div className="space-y-4 xl:col-span-3">
        <div>
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Entry Barriers</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {entryBarriers.map((barrier) => (
              <BarrierControlCard key={barrier.id} barrier={barrier} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Exit Barriers</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {exitBarriers.map((barrier) => (
              <BarrierControlCard key={barrier.id} barrier={barrier} />
            ))}
          </div>
        </div>
      </div>

      <AppCard className="h-fit">
        <AppCardHeader>
          <AppCardTitle>Controller Health</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {allBarriers.map((barrier) => (
              <li key={barrier.id} className="flex items-center justify-between gap-2 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{barrier.name}</p>
                  <p className="truncate text-[11px] text-text-tertiary">{barrier.gateName}</p>
                </div>
                <StatusBadge tone={DEVICE_STATUS_TONE[barrier.controllerHealth]}>
                  {DEVICE_STATUS_LABEL[barrier.controllerHealth]}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
