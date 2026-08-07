import {
  Camera,
  CameraOff,
  FlameKindling,
  DoorOpen,
  ParkingSquare,
  Thermometer,
  BrainCircuit,
  ShieldAlert,
  ShieldEllipsis,
  HardDrive,
  ServerCog,
  Wifi,
  Cpu,
  MemoryStick,
  Database,
  Network,
  Container,
  Router,
  Gauge,
  Signal,
  PhoneCall,
} from 'lucide-react';

import type {
  ActivityLogRow,
  CampusZone,
  DashboardAlert,
  DeviceStatusSummary,
  HealthMetric,
  IncidentTrendPoint,
  KpiMetric,
  ModuleDistributionSlice,
  NetworkStat,
  SeveritySlice,
  StorageStat,
  TimelineEvent,
  WeeklyStatPoint,
} from '@/types/dashboard';

/** Section 1 — System Overview KPI cards. */
export const dashboardKpis: KpiMetric[] = [
  {
    id: 'total-cameras',
    label: 'Total Cameras',
    value: 138,
    icon: Camera,
    tone: 'neutral',
    trend: { direction: 'up', value: '+4 this month' },
    sparkline: [118, 121, 124, 126, 129, 131, 133, 134, 135, 136, 137, 138],
  },
  {
    id: 'online-cameras',
    label: 'Online Cameras',
    value: 126,
    icon: Camera,
    tone: 'success',
    hint: '91.3% availability',
    sparkline: [120, 122, 121, 124, 123, 125, 124, 126, 125, 126, 127, 126],
  },
  {
    id: 'offline-cameras',
    label: 'Offline Cameras',
    value: 12,
    icon: CameraOff,
    tone: 'danger',
    trend: { direction: 'down', value: '-3 vs yesterday' },
    sparkline: [18, 17, 16, 15, 16, 14, 13, 15, 14, 13, 12, 12],
  },
  {
    id: 'fire-devices',
    label: 'Fire Devices',
    value: 48,
    icon: FlameKindling,
    tone: 'success',
    hint: 'All zones reporting',
    sparkline: [48, 48, 47, 48, 48, 48, 48, 48, 48, 48, 48, 48],
  },
  {
    id: 'access-controllers',
    label: 'Access Controllers',
    value: 3,
    icon: DoorOpen,
    tone: 'warning',
    hint: '3 / 5 online — see Access Control',
    sparkline: [4, 4, 3, 4, 4, 3, 3, 4, 3, 3, 3, 3],
  },
  {
    id: 'parking-gates',
    label: 'Parking Gates',
    value: 6,
    icon: ParkingSquare,
    tone: 'warning',
    hint: '1 gate under maintenance',
    sparkline: [6, 6, 6, 5, 6, 6, 6, 6, 5, 6, 6, 6],
  },
  {
    id: 'environment-sensors',
    label: 'Environment Sensors',
    value: 64,
    icon: Thermometer,
    tone: 'success',
    hint: '64 / 64 reporting',
    sparkline: [62, 62, 63, 64, 64, 63, 64, 64, 64, 64, 64, 64],
  },
  {
    id: 'ai-alerts-today',
    label: 'AI Alerts Today',
    value: 37,
    icon: BrainCircuit,
    tone: 'info',
    trend: { direction: 'up', value: '+9 vs yesterday' },
    sparkline: [21, 24, 19, 26, 22, 28, 25, 30, 27, 33, 31, 37],
  },
  {
    id: 'critical-alerts',
    label: 'Critical Alerts',
    value: 4,
    icon: ShieldAlert,
    tone: 'danger',
    trend: { direction: 'up', value: '+1 in last hour' },
    sparkline: [1, 2, 1, 2, 3, 2, 2, 3, 2, 3, 3, 4],
  },
  {
    id: 'cyber-alerts',
    label: 'Cyber Alerts',
    value: 9,
    icon: ShieldEllipsis,
    tone: 'warning',
    hint: '2 unresolved',
    sparkline: [4, 5, 6, 5, 7, 6, 8, 7, 8, 9, 8, 9],
  },
  {
    id: 'storage-usage',
    label: 'Storage Usage',
    value: '71%',
    icon: HardDrive,
    tone: 'warning',
    hint: '18.4 TB / 26 TB used',
    sparkline: [58, 60, 61, 63, 64, 65, 66, 67, 68, 69, 70, 71],
  },
  {
    id: 'server-health',
    label: 'Server Health',
    value: 'Healthy',
    icon: ServerCog,
    tone: 'success',
    hint: '99.97% uptime (30d)',
    sparkline: [99, 100, 99, 100, 100, 99, 100, 100, 99, 100, 100, 100],
  },
  {
    id: 'network-status',
    label: 'Network Status',
    value: 'Stable',
    icon: Wifi,
    tone: 'success',
    hint: '2 ms avg latency',
    sparkline: [3, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2],
  },
];

/** Section 2 — System Health. */
export const systemHealthMetrics: HealthMetric[] = [
  { id: 'cpu', label: 'CPU Usage', icon: Cpu, percent: 42, status: 'Normal', tone: 'success' },
  { id: 'ram', label: 'RAM Usage', icon: MemoryStick, percent: 68, status: 'Elevated', tone: 'warning' },
  { id: 'storage', label: 'Storage', icon: HardDrive, percent: 71, status: 'Elevated', tone: 'warning' },
  { id: 'network', label: 'Network', icon: Network, percent: 24, status: 'Normal', tone: 'success' },
  { id: 'database', label: 'Database', icon: Database, percent: 55, status: 'Normal', tone: 'success' },
  { id: 'ai-engine', label: 'AI Engine', icon: BrainCircuit, percent: 63, status: 'Normal', tone: 'success' },
  { id: 'cyber-engine', label: 'Cyber Engine', icon: ShieldEllipsis, percent: 31, status: 'Normal', tone: 'success' },
  { id: 'docker', label: 'Docker Services', icon: Container, percent: 88, status: '24 / 24 up', tone: 'info' },
];

/** Section 3 — Live Event Timeline. */
export const timelineEvents: TimelineEvent[] = [
  { id: 'TL-001', title: 'AI Weapon Detection triggered - Main Gate', module: 'AI Analytics', priority: 'danger', status: 'open', timestamp: '09:41:12' },
  { id: 'TL-002', title: 'Unauthorized Entry - Server Room DR-002', module: 'Access Control', priority: 'danger', status: 'open', timestamp: '09:38:47' },
  { id: 'TL-003', title: 'Camera Offline - CAM-041 Perimeter North', module: 'Video Surveillance', priority: 'warning', status: 'acknowledged', timestamp: '09:27:03' },
  { id: 'TL-004', title: 'Smoke Detected - Block C Level 2', module: 'Fire & Emergency', priority: 'danger', status: 'acknowledged', timestamp: '09:12:55' },
  { id: 'TL-005', title: 'Parking Gate Open - PG-01 Main Entry', module: 'Smart Parking', priority: 'info', status: 'resolved', timestamp: '08:58:21' },
  { id: 'TL-006', title: 'Intrusion Detection - North Perimeter Fence', module: 'AI Analytics', priority: 'warning', status: 'acknowledged', timestamp: '08:44:09' },
  { id: 'TL-007', title: 'Cyber Alert - Repeated login failures', module: 'Cyber Security', priority: 'warning', status: 'open', timestamp: '08:30:16' },
  { id: 'TL-008', title: 'Fire Alarm Test Completed - Zone 4', module: 'Fire & Emergency', priority: 'info', status: 'resolved', timestamp: '08:15:44' },
  { id: 'TL-009', title: 'Server Restarted - App Node 02', module: 'Device Management', priority: 'info', status: 'resolved', timestamp: '07:52:30' },
  { id: 'TL-010', title: 'System Update Applied - v1.4.2', module: 'Settings', priority: 'info', status: 'resolved', timestamp: '07:20:00' },
];

/** Section 4 — Recent Alerts. */
export const dashboardAlerts: DashboardAlert[] = [
  {
    id: 'ALR-2041',
    severity: 'danger',
    timestamp: '2 min ago',
    location: 'North Perimeter Fence',
    module: 'AI Analytics',
    description: 'Weapon detection model flagged a high-confidence match on CAM-041 feed.',
    status: 'open',
  },
  {
    id: 'ALR-2040',
    severity: 'danger',
    timestamp: '9 min ago',
    location: 'Server Room · Block A B2',
    module: 'Access Control',
    description: 'Unauthorized badge attempt on restricted door DR-002 (3 consecutive denials).',
    status: 'investigating',
  },
  {
    id: 'ALR-2038',
    severity: 'warning',
    timestamp: '14 min ago',
    location: 'Block C · Level 2',
    module: 'Fire & Emergency',
    description: 'Smoke density threshold exceeded on sensor SM-014, awaiting confirmation.',
    status: 'investigating',
  },
  {
    id: 'ALR-2035',
    severity: 'warning',
    timestamp: '22 min ago',
    location: 'Perimeter North',
    module: 'Video Surveillance',
    description: 'CAM-041 stopped responding to heartbeat ping, recording interrupted.',
    status: 'open',
  },
  {
    id: 'ALR-2029',
    severity: 'warning',
    timestamp: '41 min ago',
    location: 'Edge Gateway 03',
    module: 'Cyber Security',
    description: 'Multiple failed authentication attempts detected from an internal subnet.',
    status: 'investigating',
  },
  {
    id: 'ALR-2018',
    severity: 'info',
    timestamp: '1 hr ago',
    location: 'Visitor Entry',
    module: 'Smart Parking',
    description: 'Barrier PG-03 left open beyond configured threshold, auto-closed by system.',
    status: 'resolved',
  },
];

/** Section 6 — Device Status. */
export const deviceStatusSummaries: DeviceStatusSummary[] = [
  { id: 'cameras', label: 'Cameras', icon: Camera, online: 126, offline: 9, maintenance: 3 },
  { id: 'fire-panels', label: 'Fire Panels', icon: FlameKindling, online: 46, offline: 1, maintenance: 1 },
  { id: 'access-controllers', label: 'Access Controllers', icon: DoorOpen, online: 3, offline: 1, maintenance: 1 },
  { id: 'parking-devices', label: 'Parking Devices', icon: ParkingSquare, online: 5, offline: 0, maintenance: 1 },
  { id: 'environment-sensors', label: 'Environment Sensors', icon: Thermometer, online: 61, offline: 2, maintenance: 1 },
  { id: 'intercom', label: 'Intercom', icon: PhoneCall, online: 18, offline: 1, maintenance: 0 },
];

/** Section 7 — Storage. */
export const storageStats: StorageStat[] = [
  { id: 'recording-storage', label: 'Recording Storage', usedPct: 76, used: '15.2 TB', total: '20 TB', tone: 'warning' },
  { id: 'database-storage', label: 'Database Storage', usedPct: 38, used: '456 GB', total: '1.2 TB', tone: 'success' },
  { id: 'available-capacity', label: 'Available Capacity', usedPct: 29, used: '7.6 TB', total: '26 TB', tone: 'success' },
  { id: 'retention', label: 'Retention Policy', usedPct: 90, used: '27 of 30 days', total: '30 days', tone: 'info' },
];

/** Section 8 — Network. */
export const networkStats: NetworkStat[] = [
  { id: 'bandwidth', label: 'Bandwidth', value: '412 / 1000 Mbps', tone: 'success', icon: Gauge },
  { id: 'packet-loss', label: 'Packet Loss', value: '0.02%', tone: 'success', icon: Signal },
  { id: 'latency', label: 'Latency', value: '2 ms', tone: 'success', icon: Network },
  { id: 'gateway', label: 'Gateway', value: '10.10.0.1', tone: 'neutral', icon: Router },
  { id: 'internet', label: 'Internet Status', value: 'Connected', tone: 'success', icon: Wifi },
  { id: 'lan', label: 'LAN Status', value: 'Stable', tone: 'success', icon: Network },
];

/** Section 9 — Recent Activity table. */
export const activityLog: ActivityLogRow[] = [
  { id: 'ACT-9001', time: '09:41:12', event: 'AI weapon detection triggered', module: 'AI Analytics', priority: 'danger', operator: 'System', status: 'open' },
  { id: 'ACT-9000', time: '09:38:47', event: 'Unauthorized entry attempt', module: 'Access Control', priority: 'danger', operator: 'System', status: 'open' },
  { id: 'ACT-8996', time: '09:27:03', event: 'Camera CAM-041 went offline', module: 'Video Surveillance', priority: 'warning', operator: 'System', status: 'acknowledged' },
  { id: 'ACT-8991', time: '09:12:55', event: 'Smoke detected - Block C Level 2', module: 'Fire & Emergency', priority: 'danger', operator: 'Rahul Nair', status: 'acknowledged' },
  { id: 'ACT-8988', time: '08:58:21', event: 'Parking gate PG-01 opened', module: 'Smart Parking', priority: 'info', operator: 'System', status: 'resolved' },
  { id: 'ACT-8980', time: '08:44:09', event: 'Intrusion detection - North fence', module: 'AI Analytics', priority: 'warning', operator: 'Karthik Menon', status: 'acknowledged' },
  { id: 'ACT-8973', time: '08:30:16', event: 'Repeated login failures detected', module: 'Cyber Security', priority: 'warning', operator: 'System', status: 'open' },
  { id: 'ACT-8965', time: '08:15:44', event: 'Fire alarm test completed - Zone 4', module: 'Fire & Emergency', priority: 'info', operator: 'Divya Prasad', status: 'resolved' },
  { id: 'ACT-8952', time: '07:52:30', event: 'Server restarted - App Node 02', module: 'Device Management', priority: 'info', operator: 'System', status: 'resolved' },
  { id: 'ACT-8940', time: '07:20:00', event: 'System update applied - v1.4.2', module: 'Settings', priority: 'info', operator: 'Aishwarya Rao', status: 'resolved' },
  { id: 'ACT-8933', time: '06:58:12', event: 'Air quality threshold exceeded - Cafeteria', module: 'Environment Monitoring', priority: 'warning', operator: 'System', status: 'acknowledged' },
  { id: 'ACT-8921', time: '06:30:41', event: 'Nightly database backup completed', module: 'Settings', priority: 'info', operator: 'System', status: 'resolved' },
];

/** Section 5 — Incident Analytics (Recharts). */
export const incidentTrend: IncidentTrendPoint[] = [
  { day: 'Mon', incidents: 18, resolved: 15 },
  { day: 'Tue', incidents: 22, resolved: 19 },
  { day: 'Wed', incidents: 15, resolved: 14 },
  { day: 'Thu', incidents: 27, resolved: 21 },
  { day: 'Fri', incidents: 31, resolved: 24 },
  { day: 'Sat', incidents: 19, resolved: 18 },
  { day: 'Sun', incidents: 12, resolved: 12 },
];

export const moduleDistribution: ModuleDistributionSlice[] = [
  { module: 'Video Surveillance', value: 38, color: 'var(--color-primary-500)' },
  { module: 'Access Control', value: 22, color: 'var(--color-accent-500)' },
  { module: 'AI Analytics', value: 18, color: 'var(--color-success-500)' },
  { module: 'Fire & Emergency', value: 10, color: 'var(--color-danger-500)' },
  { module: 'Smart Parking', value: 7, color: 'var(--color-warning-500)' },
  { module: 'Environment', value: 5, color: 'var(--color-secondary-500)' },
];

export const severityDistribution: SeveritySlice[] = [
  { severity: 'Critical', value: 4, color: 'var(--color-danger-500)' },
  { severity: 'Warning', value: 21, color: 'var(--color-warning-500)' },
  { severity: 'Info', value: 46, color: 'var(--color-info-500)' },
  { severity: 'Resolved', value: 63, color: 'var(--color-success-500)' },
];

export const weeklyStats: WeeklyStatPoint[] = [
  { day: 'Mon', alerts: 14, events: 62 },
  { day: 'Tue', alerts: 19, events: 74 },
  { day: 'Wed', alerts: 11, events: 58 },
  { day: 'Thu', alerts: 23, events: 81 },
  { day: 'Fri', alerts: 27, events: 96 },
  { day: 'Sat', alerts: 16, events: 55 },
  { day: 'Sun', alerts: 9, events: 41 },
];

/** Section 11 — Campus Map placeholder zones. */
export const campusZones: CampusZone[] = [
  { id: 'block-a', name: 'Block A - Admin', x: 40, y: 40, width: 160, height: 100, tone: 'success', devices: 34 },
  { id: 'block-b', name: 'Block B', x: 220, y: 40, width: 140, height: 100, tone: 'success', devices: 28 },
  { id: 'block-c', name: 'Block C', x: 380, y: 40, width: 140, height: 100, tone: 'warning', devices: 22 },
  { id: 'server-room', name: 'Server Room', x: 40, y: 160, width: 110, height: 80, tone: 'success', devices: 12 },
  { id: 'cafeteria', name: 'Cafeteria', x: 170, y: 160, width: 110, height: 80, tone: 'warning', devices: 9 },
  { id: 'parking-l1', name: 'Parking Level 1', x: 300, y: 160, width: 220, height: 80, tone: 'success', devices: 18 },
  { id: 'north-perimeter', name: 'North Perimeter', x: 40, y: 260, width: 480, height: 50, tone: 'danger', devices: 15 },
];
