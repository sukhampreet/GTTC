import type { DeviceStatusCategory } from '@/modules/live-monitoring/types';

export const deviceStatusCategories: DeviceStatusCategory[] = [
  { id: 'cameras', label: 'Cameras', online: 132, offline: 4, maintenance: 2 },
  { id: 'access', label: 'Access Devices', online: 58, offline: 2, maintenance: 1 },
  { id: 'fire', label: 'Fire Panels', online: 22, offline: 0, maintenance: 1 },
  { id: 'intercom', label: 'Intercom Devices', online: 34, offline: 1, maintenance: 0 },
  { id: 'parking', label: 'Parking Devices', online: 16, offline: 1, maintenance: 0 },
  { id: 'environment', label: 'Environment Sensors', online: 48, offline: 2, maintenance: 1 },
];
