import { Ban, Car } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { cn } from '@/utils/cn';
import { SLOT_STATUS_TONE, titleCase } from '@/modules/smart-parking/components/shared/statusTone';
import type { ParkingSlot } from '@/modules/smart-parking/types';

export interface ParkingSlotGridProps {
  slots: ParkingSlot[];
}

const TILE_TONE_CLASSES: Record<ParkingSlot['status'], string> = {
  available: 'border-success-600/40 bg-success-bg/40',
  occupied: 'border-info-500/40 bg-info-bg/40',
  reserved: 'border-warning-600/40 bg-warning-bg/40',
  disabled: 'border-border-default bg-surface-hover/60',
};

export function ParkingSlotGrid({ slots }: ParkingSlotGridProps) {
  if (slots.length === 0) {
    return <EmptyState title="No parking slots found" description="Try a different search term or filter." />;
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {slots.map((slot) => (
        <div
          key={slot.id}
          className={cn('flex flex-col gap-1.5 rounded-(--radius-md) border p-3', TILE_TONE_CLASSES[slot.status])}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13.5px] font-semibold text-text-primary">{slot.slotNumber}</p>
            {slot.status === 'disabled' ? (
              <Ban className="size-3.5 text-text-tertiary" />
            ) : (
              <Car className={cn('size-3.5', slot.status === 'occupied' ? 'text-info-400' : 'text-text-tertiary')} />
            )}
          </div>
          <StatusBadge tone={SLOT_STATUS_TONE[slot.status]} className="w-fit">
            {titleCase(slot.status)}
          </StatusBadge>
          {slot.status === 'occupied' ? (
            <div className="mt-0.5 text-[11px] text-text-tertiary">
              <p className="truncate font-mono text-[11.5px] text-text-secondary">{slot.vehicleNumber}</p>
              <p className="truncate">{slot.vehicleType} · {slot.duration}</p>
            </div>
          ) : slot.status === 'reserved' ? (
            <p className="mt-0.5 truncate text-[11px] text-text-tertiary">{slot.reservedFor}</p>
          ) : (
            <p className="mt-0.5 text-[11px] text-text-tertiary">{slot.floor}</p>
          )}
        </div>
      ))}
    </div>
  );
}
