import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';
import type { AlarmSeverity, FaultPriority, SmokeStatus, HeatStatus, ZoneAlarmState } from '@/modules/fire-emergency/types';

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

export const SMOKE_STATUS_TONE: Record<SmokeStatus, StatusTone> = {
  normal: 'success',
  warning: 'warning',
  alarm: 'danger',
  offline: 'neutral',
};

export const HEAT_STATUS_TONE: Record<HeatStatus, StatusTone> = {
  normal: 'success',
  elevated: 'warning',
  alarm: 'danger',
  offline: 'neutral',
};

export const ALARM_SEVERITY_TONE: Record<AlarmSeverity, StatusTone> = {
  critical: 'danger',
  major: 'warning',
  minor: 'info',
};

export const FAULT_PRIORITY_TONE: Record<FaultPriority, StatusTone> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

export const ZONE_ALARM_TONE: Record<ZoneAlarmState, StatusTone> = {
  clear: 'success',
  warning: 'warning',
  alarm: 'danger',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
