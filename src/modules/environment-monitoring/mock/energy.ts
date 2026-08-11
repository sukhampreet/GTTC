import type { EnergyReading, TrendPoint } from '@/modules/environment-monitoring/types';

export const energyZones: EnergyReading[] = [
  { id: 'EN-01', zone: 'Block A', currentKw: 18.2, dailyKwh: 412, weeklyKwh: 2860, monthlyKwh: 12100, peakKw: 26.4 },
  { id: 'EN-02', zone: 'Block B', currentKw: 12.4, dailyKwh: 298, weeklyKwh: 2050, monthlyKwh: 8700, peakKw: 19.8 },
  { id: 'EN-03', zone: 'Server Room', currentKw: 62.5, dailyKwh: 1500, weeklyKwh: 10500, monthlyKwh: 44800, peakKw: 68.2 },
  { id: 'EN-04', zone: 'Block C - Warehouse', currentKw: 34.8, dailyKwh: 720, weeklyKwh: 4980, monthlyKwh: 21200, peakKw: 41.6 },
  { id: 'EN-05', zone: 'Cafeteria', currentKw: 8.6, dailyKwh: 165, weeklyKwh: 1120, monthlyKwh: 4750, peakKw: 14.2 },
];

export const energyDailyTrend: TrendPoint[] = [
  { label: '00:00', value: 12 },
  { label: '03:00', value: 10 },
  { label: '06:00', value: 15 },
  { label: '09:00', value: 28 },
  { label: '12:00', value: 34 },
  { label: '15:00', value: 31 },
  { label: '18:00', value: 26 },
  { label: '21:00', value: 18 },
];

export const energyWeeklyTrend: TrendPoint[] = [
  { label: 'Mon', value: 412 },
  { label: 'Tue', value: 438 },
  { label: 'Wed', value: 456 },
  { label: 'Thu', value: 421 },
  { label: 'Fri', value: 468 },
  { label: 'Sat', value: 310 },
  { label: 'Sun', value: 285 },
];
