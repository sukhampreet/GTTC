import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/fire-emergency/components/shared/statusTone';
import type { PaZone } from '@/modules/fire-emergency/types';

export interface PaZoneCardsProps {
  zones: PaZone[];
}

function PaZoneCard({ zone }: { zone: PaZone }) {
  const [volume, setVolume] = useState(zone.volume);

  return (
    <AppCard className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-text-primary">{zone.zoneName}</p>
          <p className="truncate text-[11px] text-text-tertiary">{zone.speakerCount} speakers</p>
        </div>
        {zone.emergencyMode && <StatusBadge tone="danger">Emergency Mode</StatusBadge>}
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="text-text-tertiary">Speaker Status</span>
        <StatusBadge tone={DEVICE_STATUS_TONE[zone.speakerStatus]}>{DEVICE_STATUS_LABEL[zone.speakerStatus]}</StatusBadge>
      </div>

      <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-3 py-2 text-[12px] text-text-secondary">
        {zone.currentBroadcast ? (
          <span className="inline-flex items-center gap-1.5 text-warning-400">
            <Volume2 className="size-3.5" />
            {zone.currentBroadcast}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-text-tertiary">
            <VolumeX className="size-3.5" />
            No active broadcast
          </span>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px] text-text-tertiary">
          <span>Volume</span>
          <span className="tabular-nums text-text-secondary">{volume}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="mt-1.5 w-full accent-[var(--color-primary-500)]"
        />
      </div>
    </AppCard>
  );
}

export function PaZoneCards({ zones }: PaZoneCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {zones.map((zone) => (
        <PaZoneCard key={zone.id} zone={zone} />
      ))}
    </div>
  );
}
