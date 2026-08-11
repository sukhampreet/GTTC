import { FlameKindling, MapPinned, Thermometer } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ZONE_ALARM_TONE, titleCase } from '@/modules/fire-emergency/components/shared/statusTone';
import type { ZoneMonitoringCard as ZoneMonitoringCardType } from '@/modules/fire-emergency/types';

export interface ZoneCardsProps {
  zones: ZoneMonitoringCardType[];
}

export function ZoneCards({ zones }: ZoneCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {zones.map((zone) => (
        <AppCard key={zone.id} className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPinned className="size-4 text-text-tertiary" />
              <div>
                <p className="text-[13.5px] font-semibold text-text-primary">{zone.id}</p>
                <p className="text-[11px] text-text-tertiary">{zone.building}</p>
              </div>
            </div>
            <StatusBadge tone={ZONE_ALARM_TONE[zone.status]}>{titleCase(zone.status)}</StatusBadge>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-2">
              <p className="inline-flex items-center gap-1 text-[10.5px] text-text-tertiary">
                <Thermometer className="size-3" />
                Temp
              </p>
              <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-text-primary">{zone.temperature}°C</p>
            </div>
            <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-2">
              <p className="inline-flex items-center gap-1 text-[10.5px] text-text-tertiary">
                <FlameKindling className="size-3" />
                Smoke
              </p>
              <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-text-primary">{zone.smokeLevel}%</p>
            </div>
          </div>

          <p className="text-[11px] text-text-tertiary">{zone.devices} devices in zone</p>
        </AppCard>
      ))}
    </div>
  );
}
