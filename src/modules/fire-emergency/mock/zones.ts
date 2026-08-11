import type { ZoneMonitoringCard } from '@/modules/fire-emergency/types';

export const zoneMonitoring: ZoneMonitoringCard[] = [
  { id: 'Zone A', building: 'Block A', status: 'clear', devices: 22, temperature: 26, smokeLevel: 4 },
  { id: 'Zone B', building: 'Block B', status: 'warning', devices: 18, temperature: 28, smokeLevel: 91 },
  { id: 'Zone C', building: 'Block C', status: 'warning', devices: 14, temperature: 58, smokeLevel: 62 },
  { id: 'Zone D', building: 'Block D', status: 'clear', devices: 9, temperature: 24, smokeLevel: 3 },
];
