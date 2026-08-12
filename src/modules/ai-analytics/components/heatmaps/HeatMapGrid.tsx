import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { heatMapZones } from '@/modules/ai-analytics/mock';

interface HeatMapGridProps {
  metric: 'activityDensity' | 'crowdDensity' | 'movementIndex';
  title: string;
}

/**
 * Professional heat-map style visualization built from CSS color-mix, avoiding
 * a heavy mapping/geo library that isn't already part of the project stack.
 */
export function HeatMapGrid({ metric, title }: HeatMapGridProps) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>{title}</AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {heatMapZones.map((zone) => {
            const value = zone[metric];
            return (
              <div
                key={zone.id}
                className="flex flex-col justify-between gap-4 rounded-(--radius-md) border border-border-default p-3"
                style={{ backgroundColor: `color-mix(in srgb, var(--color-danger-500) ${value}%, var(--color-bg-surface))` }}
              >
                <p className="truncate text-[12px] font-medium text-text-primary">{zone.zone}</p>
                <p className="text-xl font-semibold tabular-nums text-text-primary">{value}</p>
              </div>
            );
          })}
        </div>
      </AppCardContent>
    </AppCard>
  );
}
