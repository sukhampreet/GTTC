import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';
import type { AccessLogStatus } from '@/modules/access-control/types';

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

export const ACCESS_LOG_STATUS_TONE: Record<AccessLogStatus, StatusTone> = {
  granted: 'success',
  denied: 'danger',
  forced: 'danger',
  timeout: 'warning',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
