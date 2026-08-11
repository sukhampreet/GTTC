import { Users, Building2 } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { StatusTone } from '@/types/common';
import type { OccupancyReading } from '@/modules/environment-monitoring/types';

export interface OccupancyFloorCardsProps {
  floors: OccupancyReading[];
}

function occupancyTone(current: number, capacity: number): StatusTone {
  const ratio = capacity === 0 ? 0 : current / capacity;
  if (ratio >= 0.9) return 'danger';
  if (ratio >= 0.7) return 'warning';
  return 'success';
}

export function OccupancyFloorCards({ floors }: OccupancyFloorCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {floors.map((floor) => {
        const ratio = floor.capacity === 0 ? 0 : Math.min(100, Math.round((floor.current / floor.capacity) * 100));
        const tone = occupancyTone(floor.current, floor.capacity);
        return (
          <AppCard key={floor.id} className="flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-text-tertiary" />
                <div>
                  <p className="text-[13.5px] font-semibold text-text-primary">{floor.floor}</p>
                  <p className="text-[11px] text-text-tertiary">{floor.building}</p>
                </div>
              </div>
              <StatusBadge tone={tone}>{ratio}%</StatusBadge>
            </div>

            <div className="flex items-center gap-2 rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-2">
              <Users className="size-3.5 shrink-0 text-text-tertiary" />
              <p className="text-[14px] font-semibold tabular-nums text-text-primary">
                {floor.current} <span className="text-[11px] font-normal text-text-tertiary">/ {floor.capacity} capacity</span>
              </p>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
              <div className="h-full rounded-full bg-primary-500" style={{ width: `${ratio}%` }} />
            </div>

            <p className="text-[11px] text-text-tertiary">Peak today: {floor.peak}</p>
          </AppCard>
        );
      })}
    </div>
  );
}
