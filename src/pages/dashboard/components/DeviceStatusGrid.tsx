import { useNavigate } from 'react-router-dom';

import { AppCard } from '@/components/ui/AppCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { ACCESS_CONTROL_PATHS } from '@/modules/access-control/constants/paths';
import { VIDEO_SURVEILLANCE_PATHS } from '@/modules/video-surveillance/constants/paths';
import { DEVICE_MANAGEMENT_PATHS } from '@/modules/device-management/constants/paths';
import { SMART_PARKING_PATHS } from '@/modules/smart-parking/constants/paths';
import { ENVIRONMENT_MONITORING_PATHS } from '@/modules/environment-monitoring/constants/paths';
import { deviceStatusSummaries } from '@/mock/dashboard';

/** Device summary ids that link into the Access Control module when clicked. */
const ACCESS_CONTROL_DEVICE_IDS = new Set(['access-controllers']);

/** Device summary ids that link into the Video Surveillance module when clicked. */
const VIDEO_SURVEILLANCE_DEVICE_IDS = new Set(['cameras']);

/** Device summary ids that link into the Smart Parking module when clicked. */
const SMART_PARKING_DEVICE_IDS = new Set(['parking-devices']);

/** Device summary ids that link into the Environment Monitoring module when clicked. */
const ENVIRONMENT_MONITORING_DEVICE_IDS = new Set(['environment-sensors']);

export function DeviceStatusGrid() {
  const navigate = useNavigate();

  return (
    <section>
      <SectionHeader
        title="Device Status"
        actions={
          <Button variant="ghost" size="sm" onClick={() => navigate(`${ROUTES.deviceManagement}/${DEVICE_MANAGEMENT_PATHS.inventory}`)}>
            View All Devices
          </Button>
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {deviceStatusSummaries.map((device) => {
          const Icon = device.icon;
          const total = device.online + device.offline + device.maintenance;
          const isAccessControlLinked = ACCESS_CONTROL_DEVICE_IDS.has(device.id);
          const isVideoSurveillanceLinked = VIDEO_SURVEILLANCE_DEVICE_IDS.has(device.id);
          const isSmartParkingLinked = SMART_PARKING_DEVICE_IDS.has(device.id);
          const isEnvironmentMonitoringLinked = ENVIRONMENT_MONITORING_DEVICE_IDS.has(device.id);
          const isLinked = isAccessControlLinked || isVideoSurveillanceLinked || isSmartParkingLinked || isEnvironmentMonitoringLinked;

          const handleNavigate = () => {
            if (isAccessControlLinked) navigate(`${ROUTES.accessControl}/${ACCESS_CONTROL_PATHS.doorStatus}`);
            if (isVideoSurveillanceLinked) navigate(`${ROUTES.videoSurveillance}/${VIDEO_SURVEILLANCE_PATHS.liveView}`);
            if (isSmartParkingLinked) navigate(`${ROUTES.smartParking}/${SMART_PARKING_PATHS.liveParking}`);
            if (isEnvironmentMonitoringLinked) navigate(`${ROUTES.environmentMonitoring}/${ENVIRONMENT_MONITORING_PATHS.deviceStatus}`);
          };

          return (
            <AppCard
              key={device.id}
              role={isLinked ? 'button' : undefined}
              tabIndex={isLinked ? 0 : undefined}
              onClick={isLinked ? handleNavigate : undefined}
              onKeyDown={
                isLinked
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleNavigate();
                    }
                  : undefined
              }
              className={cn(
                'p-4',
                isLinked && 'cursor-pointer transition-colors hover:border-primary-500/60 hover:bg-surface-hover',
              )}
            >
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
    </section>
  );
}
