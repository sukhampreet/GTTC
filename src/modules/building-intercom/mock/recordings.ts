import type { RecordingEntry, StorageUsage } from '@/modules/building-intercom/types';

export const recordingEntries: RecordingEntry[] = [
  { id: 'REC-501', type: 'call', station: 'ODS-Main-Gate', date: '2026-08-07 09:41', duration: '01:32', sizeMb: 18.4, retentionDays: 90 },
  { id: 'REC-500', type: 'snapshot', station: 'ODS-Visitor-Entrance', date: '2026-08-07 09:22', duration: null, sizeMb: 2.1, retentionDays: 90 },
  { id: 'REC-499', type: 'call', station: 'ODS-Emergency-East', date: '2026-08-07 08:40', duration: '03:05', sizeMb: 34.7, retentionDays: 180 },
  { id: 'REC-498', type: 'call', station: 'ODS-Cafeteria-Yard', date: '2026-08-06 17:44', duration: '02:11', sizeMb: 24.9, retentionDays: 90 },
  { id: 'REC-497', type: 'snapshot', station: 'ODS-Parking-Gate', date: '2026-08-06 16:30', duration: null, sizeMb: 1.8, retentionDays: 90 },
  { id: 'REC-496', type: 'call', station: 'ODS-Main-Gate', date: '2026-08-06 14:08', duration: '01:57', sizeMb: 21.6, retentionDays: 90 },
  { id: 'REC-495', type: 'call', station: 'ODS-Visitor-Entrance', date: '2026-08-06 11:52', duration: '00:39', sizeMb: 7.2, retentionDays: 90 },
  { id: 'REC-494', type: 'snapshot', station: 'ODS-Loading-Dock', date: '2026-08-05 19:03', duration: null, sizeMb: 2.4, retentionDays: 90 },
  { id: 'REC-493', type: 'call', station: 'ODS-Emergency-East', date: '2026-08-05 10:14', duration: '04:22', sizeMb: 41.3, retentionDays: 180 },
];

export const storageUsage: StorageUsage = {
  usedGb: 412,
  totalGb: 1024,
  retentionDays: 90,
};
