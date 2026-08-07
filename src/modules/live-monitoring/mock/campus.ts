import type { CampusIconMarker } from '@/modules/live-monitoring/types';

export const campusMarkers: CampusIconMarker[] = [
  { id: 'BLD-A', building: 'Block A — Administration', x: 60, y: 40, width: 160, height: 110, tone: 'success', cameras: 38, doors: 18, fireDevices: 20, parkingDevices: 0, environmentSensors: 12 },
  { id: 'BLD-B', building: 'Block B — Operations', x: 260, y: 40, width: 150, height: 110, tone: 'warning', cameras: 30, doors: 14, fireDevices: 16, parkingDevices: 0, environmentSensors: 10 },
  { id: 'BLD-C', building: 'Block C — Logistics & Utility', x: 60, y: 190, width: 170, height: 120, tone: 'warning', cameras: 34, doors: 12, fireDevices: 18, parkingDevices: 8, environmentSensors: 9 },
  { id: 'BLD-D', building: 'Block D — Amenities', x: 270, y: 190, width: 140, height: 120, tone: 'success', cameras: 20, doors: 10, fireDevices: 8, parkingDevices: 6, environmentSensors: 8 },
];
