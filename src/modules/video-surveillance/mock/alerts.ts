import type { AlertItem, RecentEvent } from '@/modules/video-surveillance/types';

export const recentAlerts: AlertItem[] = [
  { id: 'ALT-01', title: 'Camera Offline — CAM-041 Perimeter North', description: 'No heartbeat received for 14 minutes', tone: 'danger', timestamp: '2 min ago', camera: 'CAM-041' },
  { id: 'ALT-02', title: 'AI Alert — Intrusion Detected', description: 'Perimeter South fence line crossing at 21:42', tone: 'danger', timestamp: '8 min ago', camera: 'CAM-042' },
  { id: 'ALT-03', title: 'Storage Warning', description: 'NVR-03 storage utilisation crossed 80%', tone: 'warning', timestamp: '22 min ago' },
  { id: 'ALT-04', title: 'Camera Degraded — CAM-028', description: 'Bitrate dropped below configured threshold', tone: 'warning', timestamp: '34 min ago', camera: 'CAM-028' },
  { id: 'ALT-05', title: 'AI Alert — Person Detected After Hours', description: 'Library Reading Hall, outside operating hours', tone: 'warning', timestamp: '51 min ago', camera: 'CAM-022' },
  { id: 'ALT-06', title: 'Firmware Update Available', description: '6 cameras eligible for firmware v4.2.1', tone: 'info', timestamp: '2 hr ago' },
];

export const recentEvents: RecentEvent[] = [
  { id: 'EVT-01', time: '09:41:12', camera: 'CAM-001 Main Gate Entry', event: 'Vehicle detected — plate logged', type: 'ai', tone: 'info' },
  { id: 'EVT-02', time: '09:38:47', camera: 'CAM-041 Perimeter North', event: 'Camera went offline', type: 'system', tone: 'danger' },
  { id: 'EVT-03', time: '09:35:03', camera: 'CAM-042 Perimeter South', event: 'Line crossing detected', type: 'ai', tone: 'danger' },
  { id: 'EVT-04', time: '09:28:56', camera: 'CAM-031 Parking Boom Barrier', event: 'Motion detected', type: 'motion', tone: 'neutral' },
  { id: 'EVT-05', time: '09:14:29', camera: 'CAM-016 Server Room Entry', event: 'Face recognised — access logged', type: 'ai', tone: 'success' },
  { id: 'EVT-06', time: '08:57:41', camera: 'CAM-072 Hostel Block B Gate', event: 'Bitrate degraded', type: 'system', tone: 'warning' },
  { id: 'EVT-07', time: '08:40:10', camera: 'Admin', event: 'Operator started manual recording on CAM-061', type: 'user', tone: 'neutral' },
];
