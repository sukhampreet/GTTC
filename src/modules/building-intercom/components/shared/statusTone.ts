import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';
import type {
  CallHistoryStatus,
  CallLineStatus,
  DoorLinkStatus,
  LiveCallStatus,
  StationOperationalState,
} from '@/modules/building-intercom/types';

export const DEVICE_STATUS_TONE: Record<DeviceOnlineStatus, StatusTone> = {
  online: 'success',
  offline: 'danger',
  warning: 'warning',
};

export const DEVICE_STATUS_LABEL: Record<DeviceOnlineStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  warning: 'Degraded',
};

export const OPERATIONAL_STATE_TONE: Record<StationOperationalState, StatusTone> = {
  online: 'success',
  offline: 'danger',
  fault: 'danger',
  maintenance: 'warning',
};

export const OPERATIONAL_STATE_LABEL: Record<StationOperationalState, string> = {
  online: 'Online',
  offline: 'Offline',
  fault: 'Fault',
  maintenance: 'Maintenance',
};

export const DOOR_LINK_TONE: Record<DoorLinkStatus, StatusTone> = {
  locked: 'success',
  unlocked: 'warning',
  fault: 'danger',
};

export const CALL_LINE_TONE: Record<CallLineStatus, StatusTone> = {
  idle: 'neutral',
  ringing: 'warning',
  'in-call': 'info',
};

export const LIVE_CALL_STATUS_TONE: Record<LiveCallStatus, StatusTone> = {
  ringing: 'warning',
  connected: 'success',
  'on-hold': 'info',
};

export const CALL_HISTORY_STATUS_TONE: Record<CallHistoryStatus, StatusTone> = {
  answered: 'success',
  missed: 'warning',
  rejected: 'neutral',
  emergency: 'danger',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
