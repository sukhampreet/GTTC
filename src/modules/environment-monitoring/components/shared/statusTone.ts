import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';
import type {
  ThresholdStatus,
  AirQualityStatus,
  AlertSeverity,
  AlertStatus,
  HVACMode,
  LightingState,
} from '@/modules/environment-monitoring/types';

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

export const THRESHOLD_STATUS_TONE: Record<ThresholdStatus, StatusTone> = {
  normal: 'success',
  warning: 'warning',
  critical: 'danger',
};

export const AIR_QUALITY_TONE: Record<AirQualityStatus, StatusTone> = {
  good: 'success',
  moderate: 'info',
  poor: 'warning',
  critical: 'danger',
};

export const ALERT_SEVERITY_TONE: Record<AlertSeverity, StatusTone> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

export const ALERT_STATUS_TONE: Record<AlertStatus, StatusTone> = {
  active: 'danger',
  acknowledged: 'warning',
  resolved: 'success',
};

export const HVAC_MODE_TONE: Record<HVACMode, StatusTone> = {
  cooling: 'info',
  heating: 'warning',
  auto: 'success',
  off: 'neutral',
};

export const LIGHTING_STATE_TONE: Record<LightingState, StatusTone> = {
  on: 'success',
  off: 'neutral',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
