import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

export type PlatformModule =
  | 'Video Surveillance'
  | 'Access Control'
  | 'Building Intercom'
  | 'Fire & Emergency'
  | 'Smart Parking'
  | 'Environment Monitoring'
  | 'Network Infrastructure';

export type DeviceHealthState = 'healthy' | 'warning' | 'critical' | 'offline' | 'maintenance';

export interface DeviceRecord {
  id: string;
  name: string;
  deviceType: string;
  module: PlatformModule;
  location: string;
  ipAddress: string;
  macAddress: string;
  status: DeviceOnlineStatus;
  health: DeviceHealthState;
  firmwareCurrent: string;
  firmwareLatest: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  port: number;
  cpuPct: number;
  memoryPct: number;
  temperatureC: number;
  storagePct: number;
  signalPct: number;
  lastSeen: string;
}

export interface DeviceHealthCategory {
  id: string;
  label: string;
  healthy: number;
  warning: number;
  critical: number;
  offline: number;
  maintenance: number;
}

export interface DeviceHealthTrendPoint {
  day: string;
  healthy: number;
  warning: number;
  critical: number;
}

export interface DeviceGroup {
  id: string;
  name: string;
  module: PlatformModule;
  deviceCount: number;
  online: number;
  offline: number;
  health: StatusTone;
}

export interface DiagnosticRecord {
  id: string;
  device: string;
  connectionStatus: DeviceOnlineStatus;
  latencyMs: number;
  packetLossPct: number;
  cpuPct: number;
  memoryPct: number;
  storagePct: number;
  lastCommunication: string;
}

export interface FirmwareRecord {
  id: string;
  device: string;
  module: PlatformModule;
  currentVersion: string;
  availableVersion: string;
  releaseDate: string;
  status: 'up-to-date' | 'update-available' | 'update-scheduled' | 'unsupported';
}

export type MaintenanceStatus = 'scheduled' | 'in-progress' | 'completed' | 'overdue';
export type MaintenancePriority = 'critical' | 'high' | 'medium' | 'low';

export interface MaintenanceRecord {
  id: string;
  device: string;
  status: MaintenanceStatus;
  scheduledDate: string;
  technician: string;
  notes: string;
  priority: MaintenancePriority;
}

export interface NetworkDeviceRecord {
  id: string;
  device: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: DeviceOnlineStatus;
  bandwidthMbps: number;
  latencyMs: number;
  lastSeen: string;
}

export type DeviceEventSeverity = 'critical' | 'warning' | 'info';

export interface DeviceEventRecord {
  id: string;
  timestamp: string;
  device: string;
  event: string;
  severity: DeviceEventSeverity;
  status: 'open' | 'acknowledged' | 'resolved';
  description: string;
}

export const DEVICE_HEALTH_TONE: Record<DeviceHealthState, StatusTone> = {
  healthy: 'success',
  warning: 'warning',
  critical: 'danger',
  offline: 'neutral',
  maintenance: 'info',
};

export const DEVICE_STATUS_TONE: Record<DeviceOnlineStatus, StatusTone> = {
  online: 'success',
  offline: 'danger',
  warning: 'warning',
};
