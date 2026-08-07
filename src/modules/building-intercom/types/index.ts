import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

/** Broader than DeviceOnlineStatus — intercom hardware also reports fault/maintenance states. */
export type StationOperationalState = 'online' | 'offline' | 'fault' | 'maintenance';

export interface IndoorStation {
  id: string;
  stationName: string;
  building: string;
  floor: string;
  room: string;
  status: StationOperationalState;
  ipAddress: string;
  firmware: string;
  lastSeen: string;
  signalStrengthPct: number;
  health: StatusTone;
}

export type DoorLinkStatus = 'locked' | 'unlocked' | 'fault';
export type CallLineStatus = 'idle' | 'ringing' | 'in-call';

export interface OutdoorStation {
  id: string;
  stationName: string;
  location: string;
  cameraStatus: DeviceOnlineStatus;
  doorStatus: DoorLinkStatus;
  callStatus: CallLineStatus;
  ipAddress: string;
  firmware: string;
  health: StatusTone;
  onlineStatus: StationOperationalState;
  batteryPct: number | null;
}

export type CallType = 'Video' | 'Audio';
export type LiveCallStatus = 'ringing' | 'connected' | 'on-hold';

export interface LiveCall {
  id: string;
  caller: string;
  receiver: string;
  duration: string;
  status: LiveCallStatus;
  callType: CallType;
  connectionQuality: StatusTone;
}

export type CallHistoryStatus = 'answered' | 'missed' | 'rejected' | 'emergency';

export interface CallHistoryEntry {
  id: string;
  date: string;
  time: string;
  caller: string;
  receiver: string;
  callDuration: string;
  callType: CallType;
  status: CallHistoryStatus;
  operator: string;
}

export interface RemoteDoor {
  id: string;
  doorName: string;
  station: string;
  building: string;
  lockStatus: 'locked' | 'unlocked';
  doorHealth: StatusTone;
  onlineStatus: DeviceOnlineStatus;
}

export interface BroadcastGroup {
  id: string;
  name: string;
  zone: string;
  deviceCount: number;
}

export interface BroadcastDevice {
  id: string;
  name: string;
  group: string;
  status: DeviceOnlineStatus;
  selected: boolean;
}

export interface BroadcastHistoryEntry {
  id: string;
  message: string;
  group: string;
  scheduledAt: string;
  status: 'completed' | 'scheduled' | 'failed';
}

export interface DeviceWarning {
  id: string;
  device: string;
  message: string;
  tone: StatusTone;
  timestamp: string;
}

export type RecordingType = 'call' | 'snapshot';

export interface RecordingEntry {
  id: string;
  type: RecordingType;
  station: string;
  date: string;
  duration: string | null;
  sizeMb: number;
  retentionDays: number;
}

export interface StorageUsage {
  usedGb: number;
  totalGb: number;
  retentionDays: number;
}

export interface IntercomEvent {
  id: string;
  title: string;
  description: string;
  tone: StatusTone;
  timestamp: string;
}

export type IntercomConfigTab =
  | 'general'
  | 'network'
  | 'audio'
  | 'video'
  | 'recording'
  | 'users'
  | 'maintenance'
  | 'diagnostics';
