import type { ParkingReportSummary, ParkingTrendPoint } from '@/modules/reports/types';

export const parkingReportSummary: ParkingReportSummary = {
  vehicles: 612,
  entries: 348,
  exits: 331,
  occupancy: 78,
  peakHour: '09:00 – 10:00',
  averageDurationMinutes: 214,
};

export const parkingTrend: ParkingTrendPoint[] = [
  { hour: '06:00', entries: 12, exits: 2 },
  { hour: '08:00', entries: 84, exits: 9 },
  { hour: '10:00', entries: 61, exits: 22 },
  { hour: '12:00', entries: 34, exits: 41 },
  { hour: '14:00', entries: 28, exits: 33 },
  { hour: '16:00', entries: 22, exits: 58 },
  { hour: '18:00', entries: 14, exits: 96 },
  { hour: '20:00', entries: 6, exits: 40 },
];
