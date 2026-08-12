import type { LineCrossingEvent } from '@/modules/ai-analytics/types';

export const lineCrossingEvents: LineCrossingEvent[] = [
  { id: 'LC-401', time: '08:04:12', camera: 'CAM-Gate-01', line: 'Main Gate Boundary', direction: 'inbound', confidence: 96.2, status: 'acknowledged' },
  { id: 'LC-402', time: '08:19:47', camera: 'CAM-Perimeter-02', line: 'East Perimeter Line', direction: 'outbound', confidence: 88.5, status: 'active' },
  { id: 'LC-403', time: '09:02:31', camera: 'CAM-Parking-01', line: 'Parking Exit Line', direction: 'outbound', confidence: 92.8, status: 'resolved' },
  { id: 'LC-404', time: '11:47:03', camera: 'CAM-Perimeter-04', line: 'South Fence Line', direction: 'inbound', confidence: 79.4, status: 'active' },
  { id: 'LC-405', time: '14:22:56', camera: 'CAM-Gate-03', line: 'North Gate Boundary', direction: 'inbound', confidence: 95.6, status: 'resolved' },
];
