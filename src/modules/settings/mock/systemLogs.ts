import type { DatabaseTableStat, SystemLogRecord } from '@/modules/settings/types';

export const systemLogRecords: SystemLogRecord[] = [
  { id: 'LOG-001', timestamp: '2026-08-08 09:41:12', service: 'gttc-app', level: 'info', message: 'User admin authenticated successfully', source: 'auth.service', status: 'resolved' },
  { id: 'LOG-002', timestamp: '2026-08-08 09:38:47', service: 'emqx', level: 'warning', message: 'MQTT client CAM-041 disconnected unexpectedly', source: 'mqtt.broker', status: 'open' },
  { id: 'LOG-003', timestamp: '2026-08-08 09:30:05', service: 'minio', level: 'error', message: 'Object storage health check failed — retrying connection', source: 'storage.service', status: 'acknowledged' },
  { id: 'LOG-004', timestamp: '2026-08-08 09:14:29', service: 'mysql', level: 'info', message: 'Scheduled backup job completed successfully', source: 'backup.job', status: 'resolved' },
  { id: 'LOG-005', timestamp: '2026-08-08 08:57:41', service: 'gttc-app', level: 'warning', message: 'API response time exceeded 500ms threshold', source: 'api.gateway', status: 'open' },
  { id: 'LOG-006', timestamp: '2026-08-08 08:40:10', service: 'nginx', level: 'info', message: 'SSL certificate renewal check passed', source: 'nginx.cron', status: 'resolved' },
  { id: 'LOG-007', timestamp: '2026-08-08 08:22:36', service: 'redis', level: 'critical', message: 'Memory usage crossed 90% — eviction policy triggered', source: 'cache.service', status: 'acknowledged' },
  { id: 'LOG-008', timestamp: '2026-08-08 07:58:02', service: 'gttc-app', level: 'error', message: 'Failed to send SMTP notification — connection timeout', source: 'notification.service', status: 'open' },
  { id: 'LOG-009', timestamp: '2026-08-08 07:41:19', service: 'mysql', level: 'info', message: 'Database connection pool resized to 40', source: 'db.pool', status: 'resolved' },
  { id: 'LOG-010', timestamp: '2026-08-08 06:58:44', service: 'emqx', level: 'info', message: 'Broker cluster node rejoined successfully', source: 'mqtt.broker', status: 'resolved' },
];

export const databaseTableStats: DatabaseTableStat[] = [
  { id: 'tbl-01', name: 'users', rows: 9, size: '48 KB' },
  { id: 'tbl-02', name: 'cameras', rows: 25, size: '112 KB' },
  { id: 'tbl-03', name: 'access_events', rows: 184213, size: '412 MB' },
  { id: 'tbl-04', name: 'audit_logs', rows: 52840, size: '96 MB' },
  { id: 'tbl-05', name: 'sessions', rows: 6, size: '4 KB' },
  { id: 'tbl-06', name: 'notifications', rows: 12089, size: '31 MB' },
  { id: 'tbl-07', name: 'device_telemetry', rows: 984210, size: '1.2 GB' },
];
