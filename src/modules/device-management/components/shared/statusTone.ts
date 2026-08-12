import type { StatusTone } from '@/types/common';
import { DEVICE_HEALTH_TONE, DEVICE_STATUS_TONE } from '@/modules/device-management/types';

export { DEVICE_HEALTH_TONE, DEVICE_STATUS_TONE };

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const MAINTENANCE_STATUS_TONE: Record<string, StatusTone> = {
  scheduled: 'info',
  'in-progress': 'warning',
  completed: 'success',
  overdue: 'danger',
};

export const MAINTENANCE_PRIORITY_TONE: Record<string, StatusTone> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

export const FIRMWARE_STATUS_TONE: Record<string, StatusTone> = {
  'up-to-date': 'success',
  'update-available': 'warning',
  'update-scheduled': 'info',
  unsupported: 'danger',
};

export const DEVICE_EVENT_SEVERITY_TONE: Record<string, StatusTone> = {
  critical: 'danger',
  warning: 'warning',
  info: 'info',
};
