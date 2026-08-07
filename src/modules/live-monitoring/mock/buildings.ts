import type { BuildingStatusRecord } from '@/modules/live-monitoring/types';

export const buildingStatus: BuildingStatusRecord[] = [
  { id: 'BLD-A', name: 'Block A — Administration', healthPct: 96, onlineDevices: 142, offlineDevices: 3, activeAlerts: 1, tone: 'success' },
  { id: 'BLD-B', name: 'Block B — Operations', healthPct: 91, onlineDevices: 118, offlineDevices: 6, activeAlerts: 2, tone: 'warning' },
  { id: 'BLD-C', name: 'Block C — Logistics & Utility', healthPct: 84, onlineDevices: 96, offlineDevices: 11, activeAlerts: 3, tone: 'warning' },
  { id: 'BLD-D', name: 'Block D — Amenities', healthPct: 98, onlineDevices: 74, offlineDevices: 1, activeAlerts: 0, tone: 'success' },
];
