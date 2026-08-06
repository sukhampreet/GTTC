import type { StatusTone } from '@/types/common';

export type DeviceOnlineStatus = 'online' | 'offline' | 'warning';

export interface CameraRecord {
  id: string;
  name: string;
  ipAddress: string;
  status: DeviceOnlineStatus;
  recording: boolean;
  aiEnabled: boolean;
  location: string;
  firmware: string;
  lastSeen: string;
  health: StatusTone;
}

export interface DoorRecord {
  id: string;
  name: string;
  location: string;
  status: DeviceOnlineStatus;
  lastEvent: string;
  lastEventAt: string;
}

export interface ParkingGateRecord {
  id: string;
  name: string;
  type: 'entry' | 'exit';
  status: DeviceOnlineStatus;
  slotsTotal: number;
  slotsOccupied: number;
}

export interface EnvironmentSensorRecord {
  id: string;
  zone: string;
  temperatureC: number;
  humidityPct: number;
  aqi: number;
  status: DeviceOnlineStatus;
}

export interface PlatformUserRecord {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'disabled';
  lastLogin: string;
}

export interface EventRecord {
  id: string;
  title: string;
  source: string;
  severity: StatusTone;
  timestamp: string;
  acknowledged: boolean;
}
