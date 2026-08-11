import type { SnapshotRecord } from '@/modules/video-surveillance/types';

export const snapshotRecords: SnapshotRecord[] = [
  { id: 'SNAP-01', camera: 'CAM-001 Main Gate Entry', building: 'Perimeter', capturedAt: '2026-08-07 09:41', trigger: 'ai-detection', resolution: '3840×2160' },
  { id: 'SNAP-02', camera: 'CAM-042 Perimeter South', building: 'Perimeter', capturedAt: '2026-08-07 21:42', trigger: 'ai-detection', resolution: '3840×2160' },
  { id: 'SNAP-03', camera: 'CAM-031 Parking Boom Barrier', building: 'Parking', capturedAt: '2026-08-07 09:28', trigger: 'motion', resolution: '1920×1080' },
  { id: 'SNAP-04', camera: 'CAM-016 Server Room Entry', building: 'Admin Block', capturedAt: '2026-08-07 09:14', trigger: 'ai-detection', resolution: '3840×2160' },
  { id: 'SNAP-05', camera: 'CAM-061 Auditorium Main Hall', building: 'Auditorium', capturedAt: '2026-08-06 17:20', trigger: 'manual', resolution: '3840×2160' },
  { id: 'SNAP-06', camera: 'CAM-022 Library Reading Hall', building: 'Library Block', capturedAt: '2026-08-06 21:05', trigger: 'ai-detection', resolution: '1920×1080' },
  { id: 'SNAP-07', camera: 'CAM-071 Hostel Block A Gate', building: 'Hostel', capturedAt: '2026-08-06 06:12', trigger: 'scheduled', resolution: '1920×1080' },
  { id: 'SNAP-08', camera: 'CAM-052 Cafeteria Entrance', building: 'Cafeteria', capturedAt: '2026-08-05 12:03', trigger: 'motion', resolution: '1920×1080' },
  { id: 'SNAP-09', camera: 'CAM-003 Visitor Reception', building: 'Admin Block', capturedAt: '2026-08-05 10:47', trigger: 'manual', resolution: '1920×1080' },
  { id: 'SNAP-10', camera: 'CAM-081 Sports Complex Court 1', building: 'Sports Complex', capturedAt: '2026-08-05 16:30', trigger: 'scheduled', resolution: '1920×1080' },
];
