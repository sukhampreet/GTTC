import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { environmentSensors } from '@/modules/environment-monitoring/mock';
import type { DeviceHealth, EnvironmentSensorType } from '@/modules/environment-monitoring/types';

const SENSOR_TYPES: EnvironmentSensorType[] = ['Temperature', 'Humidity', 'Air Quality', 'Occupancy', 'Energy Meter'];

function buildCategories(): DeviceHealth[] {
  return SENSOR_TYPES.map((type) => {
    const sensors = environmentSensors.filter((s) => s.type === type);
    return {
      id: type,
      label: type,
      online: sensors.filter((s) => s.status === 'online').length,
      offline: sensors.filter((s) => s.status === 'offline').length,
      warning: sensors.filter((s) => s.status === 'warning').length,
    };
  });
}

export function DeviceHealthSummaryPanel() {
  const categories = buildCategories();

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Device Health Summary</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <p className="text-[13px] font-medium text-text-primary">{category.label}</p>
              <div className="flex items-center gap-3 text-[11px] text-text-tertiary">
                <span className="text-success-400">{category.online} online</span>
                <span className="text-warning-400">{category.warning} warn</span>
                <span className="text-danger-400">{category.offline} offline</span>
              </div>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
