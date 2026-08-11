import type { StatusTone } from '@/types/common';

export type SystemStatusState = 'online' | 'warning' | 'offline' | 'maintenance' | 'critical';

export interface SystemStatusItem {
  id: string;
  label: string;
  state: SystemStatusState;
  detail: string;
}

export interface RecentAdminEvent {
  id: string;
  event: string;
  tone: StatusTone;
  timestamp: string;
}

export interface NetworkSetting {
  id: string;
  label: string;
  value: string;
}

export interface NetworkServiceStatus {
  id: string;
  label: string;
  state: SystemStatusState;
  detail: string;
}

export interface NotificationCategorySetting {
  id: string;
  label: string;
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface BackupRecord {
  id: string;
  label: string;
  type: 'full' | 'incremental' | 'configuration';
  createdAt: string;
  size: string;
  status: 'completed' | 'in-progress' | 'failed';
  location: string;
}

export interface ServiceStatusRecord {
  id: string;
  name: string;
  description: string;
  state: SystemStatusState;
  uptime: string;
  cpuPct: number;
  memoryPct: number;
}

export type LogLevel = 'info' | 'warning' | 'error' | 'critical';

export interface SystemLogRecord {
  id: string;
  timestamp: string;
  service: string;
  level: LogLevel;
  message: string;
  source: string;
  status: 'resolved' | 'open' | 'acknowledged';
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  target: string;
  ipAddress: string;
  result: 'success' | 'failed';
  description: string;
}

export interface DatabaseTableStat {
  id: string;
  name: string;
  rows: number;
  size: string;
}
