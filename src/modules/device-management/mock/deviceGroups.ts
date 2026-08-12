import { devices } from '@/modules/device-management/mock/devices';
import type { DeviceGroup, PlatformModule } from '@/modules/device-management/types';
import type { StatusTone } from '@/types/common';

const GROUP_DEFS: { name: string; module: PlatformModule; matchTypes: string[] }[] = [
  { name: 'Cameras', module: 'Video Surveillance', matchTypes: ['IP Camera', 'NVR', 'ANPR Camera'] },
  { name: 'Access Controllers', module: 'Access Control', matchTypes: ['Door Controller'] },
  { name: 'Fire Devices', module: 'Fire & Emergency', matchTypes: ['Fire Panel', 'Smoke Sensor', 'Heat Sensor', 'Manual Call Point'] },
  { name: 'Intercom', module: 'Building Intercom', matchTypes: ['Outdoor Station', 'Indoor Station'] },
  { name: 'Parking Devices', module: 'Smart Parking', matchTypes: ['Parking Barrier'] },
  { name: 'Environment Sensors', module: 'Environment Monitoring', matchTypes: ['Environment Sensor'] },
  { name: 'Network Devices', module: 'Network Infrastructure', matchTypes: ['Network Switch', 'Database Server', 'AI Edge Appliance'] },
];

export const deviceGroups: DeviceGroup[] = GROUP_DEFS.map((def, index) => {
  const members = devices.filter((d) => def.matchTypes.includes(d.deviceType));
  const online = members.filter((d) => d.status === 'online').length;
  const offline = members.filter((d) => d.status === 'offline').length;
  const hasCritical = members.some((d) => d.health === 'critical');
  const hasWarning = members.some((d) => d.health === 'warning' || d.health === 'offline');
  const health: StatusTone = hasCritical ? 'danger' : hasWarning ? 'warning' : 'success';

  return {
    id: `GRP-${String(index + 1).padStart(2, '0')}`,
    name: def.name,
    module: def.module,
    deviceCount: members.length,
    online,
    offline,
    health,
  };
}).filter((group) => group.deviceCount > 0);
