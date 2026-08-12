import type { BehaviorEvent } from '@/modules/ai-analytics/types';

export const behaviorEvents: BehaviorEvent[] = [
  { id: 'BH-601', timestamp: '13:22:11', camera: 'CAM-Parking-03', location: 'Parking Level 2', behaviorType: 'loitering', confidence: 82.4, severity: 'low', status: 'open' },
  { id: 'BH-602', timestamp: '15:07:48', camera: 'CAM-Cafeteria-01', location: 'Cafeteria', behaviorType: 'fighting', confidence: 91.6, severity: 'critical', status: 'reviewing' },
  { id: 'BH-603', timestamp: '16:44:02', camera: 'CAM-Corridor-05', location: 'Block C Corridor', behaviorType: 'fall-detection', confidence: 88.9, severity: 'high', status: 'resolved' },
  { id: 'BH-604', timestamp: '18:31:57', camera: 'CAM-Gate-01', location: 'Main Gate', behaviorType: 'running', confidence: 76.3, severity: 'medium', status: 'open' },
  { id: 'BH-605', timestamp: '20:09:14', camera: 'CAM-Lobby-01', location: 'Main Lobby', behaviorType: 'abandoned-object', confidence: 85.5, severity: 'high', status: 'reviewing' },
  { id: 'BH-606', timestamp: '23:52:36', camera: 'CAM-Perimeter-03', location: 'West Perimeter', behaviorType: 'trespassing', confidence: 90.2, severity: 'critical', status: 'open' },
];
