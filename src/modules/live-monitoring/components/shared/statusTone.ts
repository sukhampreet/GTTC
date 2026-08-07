import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';
import type { AlertSeverity, LiveEventStatus } from '@/modules/live-monitoring/types';

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

export const ALERT_SEVERITY_TONE: Record<AlertSeverity, StatusTone> = {
  Critical: 'danger',
  High: 'warning',
  Medium: 'info',
  Low: 'neutral',
};

export const EVENT_STATUS_TONE: Record<LiveEventStatus, StatusTone> = {
  new: 'danger',
  acknowledged: 'warning',
  resolved: 'success',
};

export const EVENT_STATUS_LABEL: Record<LiveEventStatus, string> = {
  new: 'New',
  acknowledged: 'Acknowledged',
  resolved: 'Resolved',
};
