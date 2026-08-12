import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { crowdZones } from '@/modules/ai-analytics/mock';
import { GENERIC_STATUS_TONE, titleCase } from '@/modules/ai-analytics/components/shared/statusTone';

/** Lightweight heat-map style visualization: intensity communicated via fill opacity, no external mapping library. */
export function CrowdZoneCards() {
  return (
    <AppCard className="p-4">
      <p className="mb-3 text-sm font-semibold text-text-primary">Location Distribution</p>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {crowdZones.map((zone) => {
          const intensity = Math.min(1, zone.currentCount / Math.max(zone.threshold, 1));
          return (
            <div
              key={zone.id}
              className="relative overflow-hidden rounded-(--radius-md) border border-border-default p-3"
              style={{ backgroundColor: `color-mix(in srgb, var(--color-danger-500) ${Math.round(intensity * 45)}%, var(--color-bg-surface))` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{zone.zone}</p>
                  <p className="truncate text-[10.5px] text-text-tertiary">{zone.location}</p>
                </div>
                <StatusBadge tone={GENERIC_STATUS_TONE[zone.density]} className="shrink-0 px-1.5 py-0">
                  {titleCase(zone.density)}
                </StatusBadge>
              </div>
              <p className={cn('mt-2 text-lg font-semibold tabular-nums text-text-primary')}>
                {zone.currentCount}
                <span className="text-xs font-normal text-text-tertiary"> / {zone.threshold}</span>
              </p>
              <p className="text-[10.5px] text-text-tertiary">Peak today: {zone.peakToday}</p>
            </div>
          );
        })}
      </div>
    </AppCard>
  );
}
