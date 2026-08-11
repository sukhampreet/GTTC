import type { BackupRecord } from '@/modules/settings/types';

export const backupRecords: BackupRecord[] = [
  { id: 'BKP-01', label: 'Full System Backup — Aug 07', type: 'full', createdAt: '2026-08-07 03:00', size: '18.4 GB', status: 'completed', location: 'Local NAS · /backups/full' },
  { id: 'BKP-02', label: 'Configuration Backup — Aug 07', type: 'configuration', createdAt: '2026-08-07 09:00', size: '42 MB', status: 'completed', location: 'Local NAS · /backups/config' },
  { id: 'BKP-03', label: 'Incremental Backup — Aug 06', type: 'incremental', createdAt: '2026-08-06 03:00', size: '2.1 GB', status: 'completed', location: 'Local NAS · /backups/incremental' },
  { id: 'BKP-04', label: 'Incremental Backup — Aug 05', type: 'incremental', createdAt: '2026-08-05 03:00', size: '1.8 GB', status: 'completed', location: 'Local NAS · /backups/incremental' },
  { id: 'BKP-05', label: 'Full System Backup — Aug 01', type: 'full', createdAt: '2026-08-01 03:00', size: '17.9 GB', status: 'completed', location: 'Offsite · S3-compatible (MinIO)' },
  { id: 'BKP-06', label: 'Configuration Backup — Jul 31', type: 'configuration', createdAt: '2026-07-31 09:00', size: '41 MB', status: 'failed', location: 'Local NAS · /backups/config' },
];

export const nextScheduledBackup = 'Tonight 03:00 (Full System Backup)';
