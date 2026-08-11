import { useNavigate } from 'react-router-dom';
import { ArrowRight, FlameKindling, Thermometer, ShieldAlert } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { zoneMonitoring } from '@/modules/fire-emergency/mock';
import { FIRE_EMERGENCY_PATHS } from '@/modules/fire-emergency/constants/paths';
import { ZONE_ALARM_TONE, titleCase } from '@/modules/fire-emergency/components/shared/statusTone';

/**
 * Live snapshot of the Fire & Emergency module's real zone data, embedded
 * directly on the Dashboard so the module's "live" view is visible without
 * navigating away. Backed by the same mock data the full Zone Monitoring
 * page renders — not a separate/disconnected placeholder.
 */
export function FireEmergencyLiveWidget() {
  const navigate = useNavigate();

  const clearZones = zoneMonitoring.filter((z) => z.status === 'clear').length;
  const activeAlarmZones = zoneMonitoring.filter((z) => z.status !== 'clear').length;

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <div className="flex items-center gap-2">
          <AppCardTitle>Fire &amp; Emergency — Live Zone Status</AppCardTitle>
          <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
            <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
            Live
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`${ROUTES.fireEmergency}/${FIRE_EMERGENCY_PATHS.zones}`)}
        >
          View all
          <ArrowRight className="size-3.5" />
        </Button>
      </AppCardHeader>

      <AppCardContent className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-text-tertiary">Zones</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-text-primary">{zoneMonitoring.length}</p>
          </div>
          <div className="rounded-(--radius-md) border border-success-500/30 bg-success-bg px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-success-400">Clear</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-success-400">{clearZones}</p>
          </div>
          <div className="rounded-(--radius-md) border border-danger-500/30 bg-danger-bg px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-danger-400">Alerts</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-danger-400">{activeAlarmZones}</p>
          </div>
        </div>

        <ul className="flex-1 divide-y divide-border-default overflow-hidden rounded-(--radius-md) border border-border-default">
          {zoneMonitoring.map((zone) => (
            <li key={zone.id} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                {zone.status === 'clear' ? (
                  <ShieldAlert className="size-3.5 shrink-0 text-text-tertiary" />
                ) : (
                  <FlameKindling className={cn('size-3.5 shrink-0', zone.status === 'alarm' ? 'text-danger-400' : 'text-warning-400')} />
                )}
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{zone.id}</p>
                  <p className="truncate text-[10.5px] text-text-tertiary">{zone.building}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10.5px] text-text-tertiary">
                  <Thermometer className="size-3" />
                  {zone.temperature}°C
                </span>
                <StatusBadge tone={ZONE_ALARM_TONE[zone.status]} className="px-1.5 py-0">
                  {titleCase(zone.status)}
                </StatusBadge>
              </div>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
