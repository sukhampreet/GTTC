import type { DailyParkingStat, PeakHourStat, WeeklyOccupancyPoint } from '@/modules/smart-parking/types';

export const dailyParkingStats: DailyParkingStat[] = [
  { label: 'Mon', entries: 142, exits: 138 },
  { label: 'Tue', entries: 156, exits: 149 },
  { label: 'Wed', entries: 134, exits: 130 },
  { label: 'Thu', entries: 168, exits: 161 },
  { label: 'Fri', entries: 181, exits: 172 },
  { label: 'Sat', entries: 97, exits: 94 },
  { label: 'Sun', entries: 62, exits: 60 },
];

export const weeklyOccupancy: WeeklyOccupancyPoint[] = [
  { label: 'Week 1', occupancy: 68 },
  { label: 'Week 2', occupancy: 74 },
  { label: 'Week 3', occupancy: 71 },
  { label: 'Week 4', occupancy: 79 },
  { label: 'Week 5', occupancy: 83 },
  { label: 'Week 6', occupancy: 77 },
];

export const peakHours: PeakHourStat[] = [
  { hour: '6 AM', vehicles: 12 },
  { hour: '7 AM', vehicles: 38 },
  { hour: '8 AM', vehicles: 96 },
  { hour: '9 AM', vehicles: 121 },
  { hour: '10 AM', vehicles: 74 },
  { hour: '11 AM', vehicles: 58 },
  { hour: '12 PM', vehicles: 65 },
  { hour: '1 PM', vehicles: 49 },
  { hour: '2 PM', vehicles: 41 },
  { hour: '3 PM', vehicles: 37 },
  { hour: '4 PM', vehicles: 44 },
  { hour: '5 PM', vehicles: 89 },
  { hour: '6 PM', vehicles: 112 },
  { hour: '7 PM', vehicles: 67 },
];
