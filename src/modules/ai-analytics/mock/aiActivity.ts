import type { AiActivityEntry, CameraAiStatus } from '@/modules/ai-analytics/types';

export const aiActivityTimeline: AiActivityEntry[] = [
  { id: 'AC-01', time: '08:31', description: 'Critical intrusion detected at Perimeter Zone D', tone: 'danger' },
  { id: 'AC-02', time: '08:14', description: 'Unknown face flagged at North Gate', tone: 'warning' },
  { id: 'AC-03', time: '07:58', description: 'Crowd threshold exceeded at Auditorium Entrance', tone: 'warning' },
  { id: 'AC-04', time: '07:41', description: 'PPE violation logged at Warehouse Bay 1', tone: 'info' },
  { id: 'AC-05', time: '06:15', description: 'Perimeter Zone A intrusion resolved', tone: 'success' },
  { id: 'AC-06', time: '05:33', description: 'Warehouse Zone B motion event resolved', tone: 'success' },
];

export const cameraAiStatuses: CameraAiStatus[] = [
  { id: 'CAS-01', camera: 'CAM-Lobby-01', status: 'online', processing: true },
  { id: 'CAS-02', camera: 'CAM-Gate-01', status: 'online', processing: true },
  { id: 'CAS-03', camera: 'CAM-Gate-03', status: 'online', processing: true },
  { id: 'CAS-04', camera: 'CAM-Warehouse-01', status: 'online', processing: true },
  { id: 'CAS-05', camera: 'CAM-Perimeter-04', status: 'warning', processing: true },
  { id: 'CAS-06', camera: 'CAM-Rooftop-01', status: 'offline', processing: false },
];
