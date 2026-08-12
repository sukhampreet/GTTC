import type { StatusTone } from '@/types/common';

export type EventSeverity = 'critical' | 'high' | 'warning' | 'info';

export type EventStatus = 'open' | 'acknowledged' | 'assigned' | 'resolved' | 'closed';

export type SourceModule =
  | 'Video Surveillance'
  | 'Access Control'
  | 'Building Intercom'
  | 'Fire & Emergency'
  | 'Smart Parking'
  | 'Environment Monitoring'
  | 'AI Analytics'
  | 'Cyber Security'
  | 'Device Management';

export interface EventItem {
  id: string;
  timestamp: string;
  eventType: string;
  sourceModule: SourceModule;
  device: string;
  location: string;
  severity: EventSeverity;
  status: EventStatus;
  acknowledged: boolean;
  assignedOperator: string | null;
  description: string;
}

export interface EventStatsByModule {
  module: SourceModule;
  value: number;
  color: string;
}

export interface EventStatsBySeverity {
  severity: EventSeverity;
  value: number;
  color: string;
}

export interface EventTrendPoint {
  day: string;
  critical: number;
  warning: number;
  info: number;
}

export interface AcknowledgementRatePoint {
  day: string;
  rate: number;
}

export const EVENT_SEVERITY_TONE: Record<EventSeverity, StatusTone> = {
  critical: 'danger',
  high: 'danger',
  warning: 'warning',
  info: 'info',
};

export const EVENT_STATUS_TONE: Record<EventStatus, StatusTone> = {
  open: 'danger',
  acknowledged: 'warning',
  assigned: 'info',
  resolved: 'success',
  closed: 'neutral',
};
