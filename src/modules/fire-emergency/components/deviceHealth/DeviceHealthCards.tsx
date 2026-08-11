import { AppCard } from '@/components/ui/AppCard';
import type { DeviceHealthCategory } from '@/modules/fire-emergency/types';

export interface DeviceHealthCardsProps {
  categories: DeviceHealthCategory[];
}

export function DeviceHealthCards({ categories }: DeviceHealthCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => {
        const total = category.online + category.offline + category.maintenance;
        return (
          <AppCard key={category.id} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-semibold text-text-primary">{category.label}</p>
              <p className="text-[11px] text-text-tertiary">{total} total</p>
            </div>

            <dl className="mt-3 grid grid-cols-3 gap-1.5 text-center">
              <div className="rounded-(--radius-sm) bg-success-bg py-2">
                <dt className="text-[10px] uppercase tracking-wide text-success-400">Online</dt>
                <dd className="text-[15px] font-semibold tabular-nums text-success-400">{category.online}</dd>
              </div>
              <div className="rounded-(--radius-sm) bg-danger-bg py-2">
                <dt className="text-[10px] uppercase tracking-wide text-danger-400">Offline</dt>
                <dd className="text-[15px] font-semibold tabular-nums text-danger-400">{category.offline}</dd>
              </div>
              <div className="rounded-(--radius-sm) bg-warning-bg py-2">
                <dt className="text-[10px] uppercase tracking-wide text-warning-400">Maint.</dt>
                <dd className="text-[15px] font-semibold tabular-nums text-warning-400">{category.maintenance}</dd>
              </div>
            </dl>
          </AppCard>
        );
      })}
    </div>
  );
}
