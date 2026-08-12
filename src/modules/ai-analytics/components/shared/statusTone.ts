import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';
import type { IntrusionSeverity, MatchStatus } from '@/modules/ai-analytics/types';

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

export const SEVERITY_TONE: Record<IntrusionSeverity, StatusTone> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

export const MATCH_STATUS_TONE: Record<MatchStatus, StatusTone> = {
  matched: 'success',
  unmatched: 'neutral',
  watchlist: 'danger',
};

export const GENERIC_STATUS_TONE: Record<string, StatusTone> = {
  processed: 'success',
  reviewing: 'warning',
  flagged: 'danger',
  normal: 'success',
  review: 'warning',
  alert: 'danger',
  active: 'danger',
  investigating: 'warning',
  resolved: 'success',
  acknowledged: 'info',
  open: 'danger',
  running: 'success',
  stopped: 'neutral',
  updating: 'warning',
  error: 'danger',
  deployed: 'success',
  staged: 'warning',
  'not-deployed': 'neutral',
  low: 'success',
  moderate: 'info',
  high: 'warning',
  critical: 'danger',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
