import { useState } from 'react';
import { Lightbulb, Power } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { LIGHTING_STATE_TONE, DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, titleCase } from '@/modules/environment-monitoring/components/shared/statusTone';
import type { LightingZone } from '@/modules/environment-monitoring/types';

export interface LightingZoneCardsProps {
  zones: LightingZone[];
}

function LightingZoneCard({ zone }: { zone: LightingZone }) {
  const [on, setOn] = useState(zone.state === 'on');

  return (
    <AppCard className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-(--radius-md) border border-border-default bg-surface-raised text-warning-400">
            <Lightbulb className="size-4.5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-text-primary">{zone.zoneName}</p>
            <p className="truncate text-[11px] text-text-tertiary">{zone.building} · {zone.fixtureCount} fixtures</p>
          </div>
        </div>
        <StatusBadge tone={DEVICE_STATUS_TONE[zone.health]}>{DEVICE_STATUS_LABEL[zone.health]}</StatusBadge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-2">
          <p className="text-[10.5px] text-text-tertiary">Brightness</p>
          <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-text-primary">{on ? zone.brightnessPct : 0}%</p>
        </div>
        <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-2">
          <p className="text-[10.5px] text-text-tertiary">Energy</p>
          <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-text-primary">{on ? zone.energyKw.toFixed(1) : '0.0'} kW</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge tone={LIGHTING_STATE_TONE[on ? 'on' : 'off']}>{titleCase(on ? 'on' : 'off')}</StatusBadge>
        <Button variant={on ? 'secondary' : 'outline'} size="sm" onClick={() => setOn((v) => !v)}>
          <Power className="size-3.5" />
          {on ? 'Turn Off' : 'Turn On'}
        </Button>
      </div>
    </AppCard>
  );
}

export function LightingZoneCards({ zones }: LightingZoneCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {zones.map((zone) => (
        <LightingZoneCard key={zone.id} zone={zone} />
      ))}
    </div>
  );
}
