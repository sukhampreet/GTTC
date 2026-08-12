import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';
import type {
  BarrierStatus,
  ParkingEventType,
  ParkingSlotStatus,
  VehicleHistoryStatus,
  VehicleRecordStatus,
  VisitorPassStatus,
} from '@/modules/smart-parking/types';

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

export const SLOT_STATUS_TONE: Record<ParkingSlotStatus, StatusTone> = {
  available: 'success',
  occupied: 'info',
  reserved: 'warning',
  disabled: 'neutral',
};

export const BARRIER_STATUS_TONE: Record<BarrierStatus, StatusTone> = {
  open: 'warning',
  closed: 'success',
};

export const VEHICLE_STATUS_TONE: Record<VehicleRecordStatus, StatusTone> = {
  parked: 'info',
  exited: 'neutral',
};

export const VISITOR_PASS_TONE: Record<VisitorPassStatus, StatusTone> = {
  active: 'success',
  expired: 'danger',
  'checked-out': 'neutral',
};

export const EVENT_DIRECTION_TONE: Record<ParkingEventType, StatusTone> = {
  entry: 'success',
  exit: 'info',
};

export const VEHICLE_HISTORY_STATUS_TONE: Record<VehicleHistoryStatus, StatusTone> = {
  completed: 'neutral',
  ongoing: 'info',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
