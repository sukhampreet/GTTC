import type { OccupancyReading, TrendPoint } from '@/modules/environment-monitoring/types';

export const floorOccupancy: OccupancyReading[] = [
  { id: 'OC-01', floor: 'Ground Floor', building: 'Block A', current: 84, capacity: 150, peak: 132 },
  { id: 'OC-02', floor: '1st Floor', building: 'Block A', current: 62, capacity: 120, peak: 98 },
  { id: 'OC-03', floor: '2nd Floor', building: 'Block B', current: 45, capacity: 100, peak: 76 },
  { id: 'OC-04', floor: 'Cafeteria', building: 'Block D', current: 58, capacity: 80, peak: 79 },
  { id: 'OC-05', floor: 'Conference Center', building: 'Block C', current: 12, capacity: 200, peak: 180 },
];

export const occupancyTrend: TrendPoint[] = [
  { label: '06:00', value: 5 },
  { label: '08:00', value: 38 },
  { label: '10:00', value: 122 },
  { label: '12:00', value: 148 },
  { label: '14:00', value: 135 },
  { label: '16:00', value: 118 },
  { label: '18:00', value: 42 },
  { label: '20:00', value: 9 },
];
