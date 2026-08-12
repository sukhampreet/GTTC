import type { StatusTone } from '@/types/common';

export type ReportCategory =
  | 'Incident'
  | 'Attendance'
  | 'Parking'
  | 'Fire'
  | 'Access'
  | 'AI'
  | 'Event'
  | 'Device'
  | 'Daily'
  | 'Weekly'
  | 'Monthly';

export type ReportFormat = 'pdf' | 'csv' | 'excel';

export interface ReportHistoryEntry {
  id: string;
  title: string;
  category: ReportCategory;
  generatedBy: string;
  generatedDate: string;
  format: ReportFormat;
  status: 'ready' | 'generating' | 'failed';
}

export interface DailyReportPoint {
  date: string;
  totalEvents: number;
  criticalEvents: number;
  accessEvents: number;
  fireEvents: number;
  parkingEvents: number;
  aiEvents: number;
  deviceEvents: number;
}

export interface WeeklyTrendPoint {
  day: string;
  events: number;
  incidents: number;
  access: number;
  parking: number;
  fire: number;
  ai: number;
}

export interface MonthlyTrendPoint {
  month: string;
  incidents: number;
  access: number;
  fire: number;
  parking: number;
  environment: number;
  ai: number;
  devices: number;
}

export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface IncidentReportEntry {
  id: string;
  date: string;
  time: string;
  type: string;
  module: string;
  location: string;
  severity: IncidentSeverity;
  status: 'open' | 'in-progress' | 'resolved';
  assignedOperator: string;
  resolution: string;
}

export interface AttendanceSummary {
  totalEmployees: number;
  present: number;
  absent: number;
  late: number;
  attendanceRate: number;
}

export interface AttendanceTrendPoint {
  day: string;
  present: number;
  absent: number;
  late: number;
}

export interface ParkingReportSummary {
  vehicles: number;
  entries: number;
  exits: number;
  occupancy: number;
  peakHour: string;
  averageDurationMinutes: number;
}

export interface ParkingTrendPoint {
  hour: string;
  entries: number;
  exits: number;
}

export interface FireReportSummary {
  fireAlarms: number;
  smokeAlerts: number;
  heatAlerts: number;
  mcpEvents: number;
  faults: number;
  resolvedAlarms: number;
}

export interface AccessReportSummary {
  accessAttempts: number;
  granted: number;
  denied: number;
  unauthorizedAttempts: number;
  emergencyUnlocks: number;
  attendanceEvents: number;
}

export interface AIReportSummary {
  aiDetections: number;
  faceRecognition: number;
  personDetection: number;
  vehicleDetection: number;
  intrusion: number;
  crowd: number;
  ppe: number;
  behavior: number;
}

export interface EventReportSummary {
  totalEvents: number;
  critical: number;
  warnings: number;
  information: number;
  acknowledged: number;
  resolved: number;
}

export interface DeviceReportSummary {
  totalDevices: number;
  online: number;
  offline: number;
  warning: number;
  critical: number;
  maintenance: number;
  deviceEvents: number;
}

export interface ReportDetail {
  id: string;
  title: string;
  reportType: ReportCategory;
  dateRangeFrom: string;
  dateRangeTo: string;
  generatedBy: string;
  generatedDate: string;
  summary: string;
  notes: string;
  statistics: { label: string; value: string | number; tone?: StatusTone }[];
}
