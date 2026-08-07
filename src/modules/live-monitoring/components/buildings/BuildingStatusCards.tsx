import { Building2, Wifi, WifiOff, BellRing } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { buildingStatus } from '@/modules/live-monitoring/mock/buildings';

/** Per-building health cards for the SOC Building Status page. */
export function BuildingStatusCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {buildingStatus.map((building) => (
        <AppCard key={building.id} className="p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-(--radius-md) bg-surface-hover text-text-secondary">
                <Building2 className="size-4" />
              </div>
              <p className="text-[13px] font-medium text-text-primary">{building.name}</p>
            </div>
            <StatusBadge tone={building.tone}>{building.healthPct}%</StatusBadge>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1 text-center">
            <div className="rounded-(--radius-sm) bg-success-bg py-1.5">
              <dt className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wide text-success-400">
                <Wifi className="size-2.5" /> Online
              </dt>
              <dd className="text-[13px] font-semibold tabular-nums text-success-400">{building.onlineDevices}</dd>
            </div>
            <div className="rounded-(--radius-sm) bg-danger-bg py-1.5">
              <dt className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wide text-danger-400">
                <WifiOff className="size-2.5" /> Offline
              </dt>
              <dd className="text-[13px] font-semibold tabular-nums text-danger-400">{building.offlineDevices}</dd>
            </div>
            <div className="rounded-(--radius-sm) bg-warning-bg py-1.5">
              <dt className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wide text-warning-400">
                <BellRing className="size-2.5" /> Alerts
              </dt>
              <dd className="text-[13px] font-semibold tabular-nums text-warning-400">{building.activeAlerts}</dd>
            </div>
          </div>
        </AppCard>
      ))}
    </div>
  );
}
