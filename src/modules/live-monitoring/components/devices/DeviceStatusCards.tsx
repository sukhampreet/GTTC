import { Camera, DoorOpen, FlameKindling, PhoneCall, ParkingSquare, Thermometer, type LucideIcon } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { deviceStatusCategories } from '@/modules/live-monitoring/mock/devices';

const CATEGORY_ICON: Record<string, LucideIcon> = {
  cameras: Camera,
  access: DoorOpen,
  fire: FlameKindling,
  intercom: PhoneCall,
  parking: ParkingSquare,
  environment: Thermometer,
};

/** Professional monitoring cards — device inventory by category and health state. */
export function DeviceStatusCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {deviceStatusCategories.map((device) => {
        const Icon = CATEGORY_ICON[device.id] ?? Camera;
        const total = device.online + device.offline + device.maintenance;
        return (
          <AppCard key={device.id} className="p-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-(--radius-md) bg-surface-hover text-text-secondary">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-text-primary">{device.label}</p>
                <p className="text-[11px] text-text-tertiary">{total} total</p>
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-3 gap-1 text-center">
              <div className="rounded-(--radius-sm) bg-success-bg py-1.5">
                <dt className="text-[10px] uppercase tracking-wide text-success-400">Online</dt>
                <dd className="text-[13px] font-semibold tabular-nums text-success-400">{device.online}</dd>
              </div>
              <div className="rounded-(--radius-sm) bg-danger-bg py-1.5">
                <dt className="text-[10px] uppercase tracking-wide text-danger-400">Offline</dt>
                <dd className="text-[13px] font-semibold tabular-nums text-danger-400">{device.offline}</dd>
              </div>
              <div className="rounded-(--radius-sm) bg-warning-bg py-1.5">
                <dt className="text-[10px] uppercase tracking-wide text-warning-400">Maint.</dt>
                <dd className="text-[13px] font-semibold tabular-nums text-warning-400">{device.maintenance}</dd>
              </div>
            </dl>
          </AppCard>
        );
      })}
    </div>
  );
}
