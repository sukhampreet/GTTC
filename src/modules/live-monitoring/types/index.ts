import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

/** Camera Wall tile — Live Monitoring's own camera record (independent of the
 *  future Video Surveillance module's CameraRecord). */
export interface LiveCameraTile {
  id: string;
  name: string;
  building: string;
  location: string;
  status: DeviceOnlineStatus;
  recording: boolean;
  aiEnabled: boolean;
  resolution: string;
  timestamp: string;
  /**
   * Present only for the real, backend-integrated CP PLUS camera (Stage 2).
   * When set, the Camera Wall renders `LiveCameraPlayer` for this tile.
   * Absent/undefined for every mock camera.
   */
  liveCameraId?: string;
}

export type CameraWallLayout = 1 | 4 | 9 | 16 | 25 | 36;

export type LiveEventType =
  | 'Camera Offline'
  | 'Door Forced Open'
  | 'Smoke Detected'
  | 'Parking Barrier Opened'
  | 'Intrusion Alert'
  | 'Weapon Detection'
  | 'Unauthorized Entry'
  | 'Emergency Call'
  | 'System Restart'
  | 'Environmental Alert';

export type LiveEventStatus = 'new' | 'acknowledged' | 'resolved';

export interface LiveEventEntry {
  id: string;
  type: LiveEventType;
  timestamp: string;
  priority: StatusTone;
  module: string;
  location: string;
  status: LiveEventStatus;
}

export type AlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface LiveAlertEntry {
  id: string;
  severity: AlertSeverity;
  time: string;
  location: string;
  description: string;
  acknowledged: boolean;
}

export interface BuildingStatusRecord {
  id: string;
  name: string;
  healthPct: number;
  onlineDevices: number;
  offlineDevices: number;
  activeAlerts: number;
  tone: StatusTone;
}

export interface DeviceStatusCategory {
  id: string;
  label: string;
  online: number;
  offline: number;
  maintenance: number;
}

export interface AccessStatusSnapshot {
  doorsOpen: number;
  doorsClosed: number;
  unauthorizedAttempts: number;
  currentEntries: number;
  currentExits: number;
  emergencyUnlockActive: boolean;
}

export interface FireZoneStatus {
  id: string;
  zone: string;
  building: string;
  status: DeviceOnlineStatus | 'alarm';
  smokeSensors: number;
  heatSensors: number;
}

export interface FireStatusSnapshot {
  smokeSensors: number;
  heatSensors: number;
  firePanels: number;
  activeAlarms: number;
  faultDevices: number;
  zones: FireZoneStatus[];
}

export interface ParkingGateStatus {
  id: string;
  name: string;
  type: 'entry' | 'exit';
  status: DeviceOnlineStatus;
  barrierStatus: 'open' | 'closed';
}

export interface ParkingStatusSnapshot {
  occupiedSlots: number;
  availableSlots: number;
  totalSlots: number;
  currentVehicles: number;
  gates: ParkingGateStatus[];
}

export interface EnvironmentZoneReading {
  id: string;
  zone: string;
  temperatureC: number;
  humidityPct: number;
  aqi: number;
  co2ppm: number;
  pm25: number;
  noiseDb: number;
  powerKw: number;
  status: DeviceOnlineStatus;
}

export interface CampusIconMarker {
  id: string;
  building: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone: StatusTone;
  cameras: number;
  doors: number;
  fireDevices: number;
  parkingDevices: number;
  environmentSensors: number;
}
