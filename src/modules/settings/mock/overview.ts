import type { RecentAdminEvent, SystemStatusItem } from '@/modules/settings/types';

export const systemOverviewStatus: SystemStatusItem[] = [
  { id: 'system', label: 'System Status', state: 'online', detail: 'All core services operational' },
  { id: 'server', label: 'Server Health', state: 'online', detail: 'CPU 34% · RAM 61% · Load normal' },
  { id: 'database', label: 'Database Status', state: 'online', detail: 'MySQL 8.0 · 12ms avg query' },
  { id: 'network', label: 'Network Status', state: 'online', detail: 'LAN, API and MQTT reachable' },
  { id: 'docker', label: 'Docker / Service Status', state: 'warning', detail: '7 of 8 services healthy' },
  { id: 'notifications', label: 'Notification Status', state: 'online', detail: 'Email and push delivering normally' },
  { id: 'backup', label: 'Backup Status', state: 'online', detail: 'Last backup completed 6 hrs ago' },
  { id: 'storage', label: 'Storage Status', state: 'warning', detail: '78% of primary storage used' },
];

export const overviewSummary = {
  activeUsers: 6,
  activeSessions: 6,
  totalUsers: 9,
};

export const overviewRecentEvents: RecentAdminEvent[] = [
  { id: 'EVT-01', event: 'System backup completed successfully (Full)', tone: 'success', timestamp: '6 hrs ago' },
  { id: 'EVT-02', event: 'Service "minio" restarted after health check failure', tone: 'warning', timestamp: '9 hrs ago' },
  { id: 'EVT-03', event: 'Primary storage volume crossed 75% utilisation', tone: 'warning', timestamp: 'Yesterday' },
  { id: 'EVT-04', event: 'SMTP test email sent successfully', tone: 'info', timestamp: 'Yesterday' },
  { id: 'EVT-05', event: 'General settings updated by admin', tone: 'neutral', timestamp: '2 days ago' },
];
