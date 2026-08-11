import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';
import type { HealthState } from '@/modules/video-surveillance/types';

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

export const HEALTH_STATE_TONE: Record<HealthState, StatusTone> = {
  healthy: 'success',
  warning: 'warning',
  critical: 'danger',
  offline: 'neutral',
};

export const HEALTH_STATE_LABEL: Record<HealthState, string> = {
  healthy: 'Healthy',
  warning: 'Warning',
  critical: 'Critical',
  offline: 'Offline',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
