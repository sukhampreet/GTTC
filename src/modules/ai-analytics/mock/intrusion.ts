import type { IntrusionEvent } from '@/modules/ai-analytics/types';

export const intrusionEvents: IntrusionEvent[] = [
  { id: 'IN-301', timestamp: '01:12:44', camera: 'CAM-Perimeter-04', zone: 'Perimeter Zone D', detection: 'Person climbing fence', severity: 'critical', status: 'active' },
  { id: 'IN-302', timestamp: '02:47:10', camera: 'CAM-Rooftop-01', zone: 'Restricted Rooftop', detection: 'Unauthorized presence', severity: 'high', status: 'investigating' },
  { id: 'IN-303', timestamp: '05:33:52', camera: 'CAM-Warehouse-02', zone: 'Warehouse Zone B', detection: 'Motion after hours', severity: 'medium', status: 'resolved' },
  { id: 'IN-304', timestamp: '06:15:07', camera: 'CAM-Perimeter-01', zone: 'Perimeter Zone A', detection: 'Object left near fence', severity: 'low', status: 'resolved' },
  { id: 'IN-305', timestamp: '22:04:29', camera: 'CAM-BlockD-03', zone: 'Block D Restricted Wing', detection: 'Tailgating detected', severity: 'high', status: 'investigating' },
];
