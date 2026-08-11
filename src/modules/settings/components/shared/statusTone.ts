import type { StatusTone } from '@/types/common';
import type { LogLevel, SystemStatusState } from '@/modules/settings/types';

export const SYSTEM_STATUS_TONE: Record<SystemStatusState, StatusTone> = {
  online: 'success',
  warning: 'warning',
  offline: 'danger',
  maintenance: 'info',
  critical: 'danger',
};

export const SYSTEM_STATUS_LABEL: Record<SystemStatusState, string> = {
  online: 'Online',
  warning: 'Warning',
  offline: 'Offline',
  maintenance: 'Maintenance',
  critical: 'Critical',
};

export const LOG_LEVEL_TONE: Record<LogLevel, StatusTone> = {
  info: 'info',
  warning: 'warning',
  error: 'danger',
  critical: 'danger',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
