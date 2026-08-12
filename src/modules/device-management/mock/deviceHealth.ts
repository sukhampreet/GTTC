import { devices } from '@/modules/device-management/mock/devices';
import type { DeviceHealthCategory, DeviceHealthTrendPoint, PlatformModule } from '@/modules/device-management/types';

const MODULES: PlatformModule[] = [
  'Video Surveillance',
  'Access Control',
  'Building Intercom',
  'Fire & Emergency',
  'Smart Parking',
  'Environment Monitoring',
  'Network Infrastructure',
];

export const deviceHealthByModule: DeviceHealthCategory[] = MODULES.map((module) => {
  const inModule = devices.filter((d) => d.module === module);
  return {
    id: module,
    label: module,
    healthy: inModule.filter((d) => d.health === 'healthy').length,
    warning: inModule.filter((d) => d.health === 'warning').length,
    critical: inModule.filter((d) => d.health === 'critical').length,
    offline: inModule.filter((d) => d.health === 'offline').length,
    maintenance: inModule.filter((d) => d.health === 'maintenance').length,
  };
}).filter((entry) => entry.healthy + entry.warning + entry.critical + entry.offline + entry.maintenance > 0);

export const deviceHealthTrend: DeviceHealthTrendPoint[] = [
  { day: 'Mon', healthy: 88, warning: 8, critical: 2 },
  { day: 'Tue', healthy: 85, warning: 10, critical: 3 },
  { day: 'Wed', healthy: 90, warning: 7, critical: 1 },
  { day: 'Thu', healthy: 84, warning: 11, critical: 3 },
  { day: 'Fri', healthy: 87, warning: 9, critical: 2 },
  { day: 'Sat', healthy: 93, warning: 5, critical: 1 },
  { day: 'Sun', healthy: 89, warning: 8, critical: 2 },
];
