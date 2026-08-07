import type { FireStatusSnapshot } from '@/modules/live-monitoring/types';

export const fireStatusSnapshot: FireStatusSnapshot = {
  smokeSensors: 64,
  heatSensors: 40,
  firePanels: 22,
  activeAlarms: 1,
  faultDevices: 2,
  zones: [
    { id: 'FZ-01', zone: 'Zone 1 — Lobby & Reception', building: 'Block A', status: 'online', smokeSensors: 8, heatSensors: 4 },
    { id: 'FZ-02', zone: 'Zone 2 — Server Room', building: 'Block A', status: 'online', smokeSensors: 6, heatSensors: 6 },
    { id: 'FZ-03', zone: 'Zone 3 — Warehouse', building: 'Block C', status: 'alarm', smokeSensors: 10, heatSensors: 5 },
    { id: 'FZ-04', zone: 'Zone 4 — Finance Wing', building: 'Block B', status: 'online', smokeSensors: 8, heatSensors: 4 },
    { id: 'FZ-05', zone: 'Zone 5 — Cafeteria', building: 'Block D', status: 'warning', smokeSensors: 5, heatSensors: 3 },
    { id: 'FZ-06', zone: 'Zone 6 — Basement Utility', building: 'Block A', status: 'online', smokeSensors: 7, heatSensors: 4 },
  ],
};
