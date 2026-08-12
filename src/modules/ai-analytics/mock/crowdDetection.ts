import type { CrowdZone } from '@/modules/ai-analytics/types';

export const crowdZones: CrowdZone[] = [
  { id: 'CR-01', zone: 'Main Lobby', location: 'Block A Ground Floor', currentCount: 42, threshold: 60, density: 'moderate', peakToday: 88, camera: 'CAM-Lobby-01' },
  { id: 'CR-02', zone: 'Cafeteria', location: 'Block B Ground Floor', currentCount: 71, threshold: 80, density: 'high', peakToday: 96, camera: 'CAM-Cafeteria-01' },
  { id: 'CR-03', zone: 'Main Gate Queue', location: 'Main Gate', currentCount: 19, threshold: 40, density: 'low', peakToday: 52, camera: 'CAM-Gate-01' },
  { id: 'CR-04', zone: 'Auditorium Entrance', location: 'Block D', currentCount: 104, threshold: 100, density: 'critical', peakToday: 118, camera: 'CAM-Auditorium-01' },
  { id: 'CR-05', zone: 'Parking Concourse', location: 'Parking Level 1', currentCount: 8, threshold: 30, density: 'low', peakToday: 27, camera: 'CAM-Parking-02' },
];
