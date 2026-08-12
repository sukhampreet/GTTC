import type { HVACUnit } from '@/modules/environment-monitoring/types';

export const hvacUnits: HVACUnit[] = [
  { id: 'HVAC-01', unitName: 'AHU-1 Block A', zone: 'Block A - Floor 1', setpointC: 23, currentTempC: 23.4, mode: 'cooling', running: true, health: 'online' },
  { id: 'HVAC-02', unitName: 'AHU-2 Block A', zone: 'Block A - Floor 2', setpointC: 22, currentTempC: 24.8, mode: 'cooling', running: true, health: 'online' },
  { id: 'HVAC-03', unitName: 'CRAC-1 Server Room', zone: 'Server Room', setpointC: 19, currentTempC: 19.2, mode: 'auto', running: true, health: 'online' },
  { id: 'HVAC-04', unitName: 'AHU-3 Block B', zone: 'Block B - Floor 1', setpointC: 23, currentTempC: 29.6, mode: 'cooling', running: true, health: 'warning' },
  { id: 'HVAC-05', unitName: 'AHU-4 Block C', zone: 'Block C - Warehouse', setpointC: 24, currentTempC: 0, mode: 'off', running: false, health: 'offline' },
  { id: 'HVAC-06', unitName: 'AHU-5 Cafeteria', zone: 'Cafeteria', setpointC: 22, currentTempC: 25.1, mode: 'heating', running: true, health: 'online' },
];
