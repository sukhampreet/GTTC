import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

export type FireZoneId = 'Zone A' | 'Zone B' | 'Zone C' | 'Zone D';

export interface FirePanel {
  id: string;
  name: string;
  building: string;
  zone: FireZoneId;
  status: DeviceOnlineStatus;
  linkedDevices: number;
  firmware: string;
  lastHeartbeat: string;
}

export type SmokeStatus = 'normal' | 'warning' | 'alarm' | 'offline';

export interface SmokeSensor {
  id: string;
  name: string;
  building: string;
  floor: string;
  zone: FireZoneId;
  smokeLevel: number;
  status: SmokeStatus;
  battery: number;
  signalStrength: number;
  lastTriggered: string;
  health: DeviceOnlineStatus;
}

export type HeatStatus = 'normal' | 'elevated' | 'alarm' | 'offline';

export interface HeatSensor {
  id: string;
  name: string;
  building: string;
  floor: string;
  temperature: number;
  threshold: number;
  status: HeatStatus;
  battery: number;
  health: DeviceOnlineStatus;
  lastReading: string;
}

export type McpStatus = 'normal' | 'activated' | 'fault';

export interface McpDevice {
  id: string;
  mcpId: string;
  building: string;
  floor: string;
  zone: FireZoneId;
  status: McpStatus;
  activationCount: number;
  resetStatus: 'reset' | 'pending-reset';
  health: DeviceOnlineStatus;
}

export type AlarmSeverity = 'critical' | 'major' | 'minor';

export interface AlarmHistoryEntry {
  id: string;
  date: string;
  time: string;
  alarmType: string;
  device: string;
  zone: FireZoneId;
  building: string;
  severity: AlarmSeverity;
  acknowledged: boolean;
  resolved: boolean;
  operator: string;
}

export interface BroadcastGroup {
  id: string;
  name: string;
  zones: FireZoneId[];
  deviceCount: number;
}

export type BroadcastPlayState = 'idle' | 'playing' | 'paused';

export interface PaZone {
  id: string;
  zoneName: string;
  speakerCount: number;
  speakerStatus: DeviceOnlineStatus;
  currentBroadcast: string | null;
  emergencyMode: boolean;
  health: DeviceOnlineStatus;
  volume: number;
}

export type ZoneAlarmState = 'clear' | 'warning' | 'alarm';

export interface ZoneMonitoringCard {
  id: FireZoneId;
  building: string;
  status: ZoneAlarmState;
  devices: number;
  temperature: number;
  smokeLevel: number;
}

export interface DeviceHealthCategory {
  id: string;
  label: string;
  online: number;
  offline: number;
  maintenance: number;
}

export interface AlarmResetItem {
  id: string;
  device: string;
  zone: FireZoneId;
  alarmType: string;
  triggeredAt: string;
  status: 'active' | 'queued-for-reset';
}

export type FaultPriority = 'critical' | 'high' | 'medium' | 'low';

export interface FaultEntry {
  id: string;
  device: string;
  faultType: string;
  zone: FireZoneId;
  priority: FaultPriority;
  reportedTime: string;
  status: 'open' | 'in-progress' | 'resolved';
  assignedEngineer: string;
}

export interface EventLogEntry {
  id: string;
  timestamp: string;
  event: string;
  device: string;
  zone: FireZoneId;
  priority: AlarmSeverity;
  operator: string;
  status: 'open' | 'acknowledged' | 'resolved';
  remarks: string;
}

export type EmergencyLevel = 'normal' | 'elevated' | 'critical';

export interface EmergencyTimelineStep {
  id: string;
  time: string;
  description: string;
  done: boolean;
}

export interface EmergencyChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  tone: StatusTone;
  timestamp: string;
}
