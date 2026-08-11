import type { RecordingEntry, RecordingPolicy, StorageSummary } from '@/modules/video-surveillance/types';

export const recordingEntries: RecordingEntry[] = [
  { id: 'REC-1001', camera: 'CAM-001 Main Gate Entry', building: 'Perimeter', date: '2026-08-07', startTime: '00:00', endTime: '06:00', durationMin: 360, type: 'continuous', sizeGb: 14.2, locked: false },
  { id: 'REC-1002', camera: 'CAM-042 Perimeter South', building: 'Perimeter', date: '2026-08-07', startTime: '21:38', endTime: '21:46', durationMin: 8, type: 'ai-event', sizeGb: 0.6, locked: true },
  { id: 'REC-1003', camera: 'CAM-031 Parking Boom Barrier', building: 'Parking', date: '2026-08-07', startTime: '09:00', endTime: '10:00', durationMin: 60, type: 'motion', sizeGb: 2.1, locked: false },
  { id: 'REC-1004', camera: 'CAM-016 Server Room Entry', building: 'Admin Block', date: '2026-08-06', startTime: '00:00', endTime: '24:00', durationMin: 1440, type: 'continuous', sizeGb: 48.7, locked: false },
  { id: 'REC-1005', camera: 'CAM-061 Auditorium Main Hall', building: 'Auditorium', date: '2026-08-06', startTime: '17:20', endTime: '19:10', durationMin: 110, type: 'manual', sizeGb: 6.4, locked: true },
  { id: 'REC-1006', camera: 'CAM-022 Library Reading Hall', building: 'Library Block', date: '2026-08-06', startTime: '21:05', endTime: '21:09', durationMin: 4, type: 'ai-event', sizeGb: 0.3, locked: false },
  { id: 'REC-1007', camera: 'CAM-071 Hostel Block A Gate', building: 'Hostel', date: '2026-08-05', startTime: '00:00', endTime: '24:00', durationMin: 1440, type: 'continuous', sizeGb: 39.5, locked: false },
  { id: 'REC-1008', camera: 'CAM-052 Cafeteria Entrance', building: 'Cafeteria', date: '2026-08-05', startTime: '11:45', endTime: '13:15', durationMin: 90, type: 'motion', sizeGb: 3.8, locked: false },
];

export const recordingPolicies: RecordingPolicy[] = [
  { id: 'POL-01', name: 'Perimeter — Continuous', scope: 'Perimeter (6 cameras)', mode: 'continuous', retentionDays: 45, status: 'active' },
  { id: 'POL-02', name: 'Interior — Motion Triggered', scope: 'Admin Block, Library, Cafeteria', mode: 'motion-only', retentionDays: 30, status: 'active' },
  { id: 'POL-03', name: 'AI Event Archive', scope: 'All AI-enabled cameras', mode: 'ai-triggered', retentionDays: 90, status: 'active' },
  { id: 'POL-04', name: 'Parking — Scheduled', scope: 'Parking L1 / L2', mode: 'scheduled', retentionDays: 30, status: 'active' },
  { id: 'POL-05', name: 'Sports Complex — Motion', scope: 'Sports Complex (2 cameras)', mode: 'motion-only', retentionDays: 15, status: 'inactive' },
];

export const recordingStorage: StorageSummary[] = [
  { id: 'video-storage', label: 'Video Recording Storage', usedPct: 72, used: '58.3 TB', total: '81 TB', tone: 'warning' },
  { id: 'ai-clip-storage', label: 'AI Event Clip Storage', usedPct: 41, used: '4.9 TB', total: '12 TB', tone: 'success' },
  { id: 'snapshot-storage', label: 'Snapshot Storage', usedPct: 24, used: '620 GB', total: '2.5 TB', tone: 'success' },
  { id: 'archive-storage', label: 'Long-Term Archive', usedPct: 88, used: '17.6 TB', total: '20 TB', tone: 'danger' },
];
