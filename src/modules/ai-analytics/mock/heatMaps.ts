import type { HeatMapZone } from '@/modules/ai-analytics/types';

export const heatMapZones: HeatMapZone[] = [
  { id: 'HM-01', zone: 'Main Lobby', camera: 'CAM-Lobby-01', activityDensity: 78, crowdDensity: 62, intrusionRisk: 'low', movementIndex: 71 },
  { id: 'HM-02', zone: 'Cafeteria', camera: 'CAM-Cafeteria-01', activityDensity: 91, crowdDensity: 85, intrusionRisk: 'low', movementIndex: 88 },
  { id: 'HM-03', zone: 'Main Gate', camera: 'CAM-Gate-01', activityDensity: 54, crowdDensity: 40, intrusionRisk: 'moderate', movementIndex: 58 },
  { id: 'HM-04', zone: 'Warehouse Bay 1', camera: 'CAM-Warehouse-01', activityDensity: 66, crowdDensity: 22, intrusionRisk: 'moderate', movementIndex: 61 },
  { id: 'HM-05', zone: 'Perimeter Zone D', camera: 'CAM-Perimeter-04', activityDensity: 18, crowdDensity: 4, intrusionRisk: 'high', movementIndex: 24 },
  { id: 'HM-06', zone: 'Parking Level 1', camera: 'CAM-Parking-02', activityDensity: 47, crowdDensity: 30, intrusionRisk: 'low', movementIndex: 44 },
];
