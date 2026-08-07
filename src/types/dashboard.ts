import type { LucideIcon } from 'lucide-react';

import type { StatusTone } from '@/types/common';

export type TrendDirection = 'up' | 'down' | 'flat';

export interface DashboardTrend {
  direction: TrendDirection;
  value: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone: StatusTone;
  trend?: DashboardTrend;
  hint?: string;
  sparkline?: number[];
}

export interface HealthMetric {
  id: string;
  label: string;
  icon: LucideIcon;
  percent: number;
  status: string;
  tone: StatusTone;
}

export type TimelineStatus = 'open' | 'acknowledged' | 'resolved';

export interface TimelineEvent {
  id: string;
  title: string;
  module: string;
  priority: StatusTone;
  status: TimelineStatus;
  timestamp: string;
}

export type AlertStatus = 'open' | 'investigating' | 'resolved';

export interface DashboardAlert {
  id: string;
  severity: StatusTone;
  timestamp: string;
  location: string;
  module: string;
  description: string;
  status: AlertStatus;
}

export interface DeviceStatusSummary {
  id: string;
  label: string;
  icon: LucideIcon;
  online: number;
  offline: number;
  maintenance: number;
}

export interface StorageStat {
  id: string;
  label: string;
  usedPct: number;
  used: string;
  total: string;
  tone: StatusTone;
}

export interface NetworkStat {
  id: string;
  label: string;
  value: string;
  tone: StatusTone;
  icon: LucideIcon;
}

export interface ActivityLogRow {
  id: string;
  time: string;
  event: string;
  module: string;
  priority: StatusTone;
  operator: string;
  status: TimelineStatus;
}

export interface IncidentTrendPoint {
  day: string;
  incidents: number;
  resolved: number;
}

export interface ModuleDistributionSlice {
  module: string;
  value: number;
  color: string;
}

export interface SeveritySlice {
  severity: string;
  value: number;
  color: string;
}

export interface WeeklyStatPoint {
  day: string;
  alerts: number;
  events: number;
}

export interface CampusZone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone: StatusTone;
  devices: number;
}
