import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

/** Live door monitoring record (Live Door Status page). */
export interface DoorLiveStatus {
  id: string;
  doorName: string;
  building: string;
  floor: string;
  doorStatus: 'open' | 'closed' | 'held-open' | 'forced';
  controllerStatus: DeviceOnlineStatus;
  readerStatus: DeviceOnlineStatus;
  lockStatus: 'locked' | 'unlocked';
  connectionStatus: DeviceOnlineStatus;
  lastActivity: string;
}

export type AccessMethod = 'Face' | 'Card' | 'PIN' | 'QR Code' | 'Remote' | 'Fingerprint';
export type AccessDirection = 'in' | 'out';
export type AccessLogStatus = 'granted' | 'denied' | 'forced' | 'timeout';

export interface AccessLogEntry {
  id: string;
  time: string;
  userName: string;
  employeeId: string;
  method: AccessMethod;
  door: string;
  building: string;
  direction: AccessDirection;
  status: AccessLogStatus;
  operator: string;
  remarks: string;
}

export interface FaceRecord {
  id: string;
  name: string;
  employeeId: string;
  group: string;
  status: 'registered' | 'pending';
  templateQuality: number;
  enrolledOn: string;
  lastMatched: string;
}

export type AccessLevel = 'Level 1 - General' | 'Level 2 - Staff' | 'Level 3 - Restricted' | 'Level 4 - Critical';

export interface CardRecord {
  id: string;
  cardNumber: string;
  holder: string;
  department: string;
  accessLevel: AccessLevel;
  status: 'active' | 'inactive' | 'lost' | 'expired';
  expiryDate: string;
  assignedDoors: number;
}

export interface VisitorRecord {
  id: string;
  visitorName: string;
  company: string;
  purpose: string;
  host: string;
  checkIn: string;
  checkOut: string | null;
  passNumber: string;
  status: 'checked-in' | 'checked-out' | 'expected' | 'overstayed';
}

export interface EmployeeAccessRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  role: string;
  assignedCard: string | null;
  assignedFace: boolean;
  accessLevel: AccessLevel;
  status: 'active' | 'suspended' | 'inactive';
}

export interface ControllerRecord {
  id: string;
  name: string;
  building: string;
  ipAddress: string;
  status: DeviceOnlineStatus;
  linkedDoors: number;
  firmware: string;
  lastHeartbeat: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'on-leave';
}

export interface AttendanceTrendPoint {
  label: string;
  present: number;
  absent: number;
  late: number;
}

export interface TimeScheduleRecord {
  id: string;
  name: string;
  shiftGroup: string;
  startTime: string;
  endTime: string;
  activeDays: string[];
  appliesToHolidays: boolean;
  status: 'active' | 'inactive';
}

export interface AccessPermissionRecord {
  id: string;
  user: string;
  accessGroup: string;
  assignedDoors: number;
  schedule: string;
  permissions: string[];
  status: 'active' | 'inactive';
}

export interface AntiPassbackZone {
  id: string;
  zoneName: string;
  building: string;
  enabled: boolean;
  mode: 'hard' | 'soft' | 'timed';
  violationsToday: number;
}

export interface AntiPassbackEvent {
  id: string;
  time: string;
  zone: string;
  user: string;
  eventType: string;
  action: string;
}

export interface BlacklistEntry {
  id: string;
  name: string;
  reason: string;
  addedDate: string;
  status: 'active' | 'expired' | 'under-review';
  assignedDoors: 'All Doors' | number;
}

export interface EmergencyDoorState {
  id: string;
  doorName: string;
  building: string;
  unlocked: boolean;
  triggeredBy: string;
  triggeredAt: string;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  tone: StatusTone;
  timestamp: string;
}

export type DeviceConfigTab =
  | 'general'
  | 'network'
  | 'readers'
  | 'controllers'
  | 'firmware'
  | 'maintenance'
  | 'diagnostics';
