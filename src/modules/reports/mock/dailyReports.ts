import type { DailyReportPoint } from '@/modules/reports/types';

export const dailyReports: DailyReportPoint[] = [
  { date: '2026-08-05', totalEvents: 342, criticalEvents: 6, accessEvents: 148, fireEvents: 2, parkingEvents: 87, aiEvents: 91, deviceEvents: 8 },
  { date: '2026-08-06', totalEvents: 298, criticalEvents: 3, accessEvents: 121, fireEvents: 1, parkingEvents: 74, aiEvents: 88, deviceEvents: 11 },
  { date: '2026-08-07', totalEvents: 415, criticalEvents: 9, accessEvents: 176, fireEvents: 0, parkingEvents: 102, aiEvents: 121, deviceEvents: 6 },
  { date: '2026-08-08', totalEvents: 389, criticalEvents: 5, accessEvents: 159, fireEvents: 1, parkingEvents: 95, aiEvents: 118, deviceEvents: 9 },
  { date: '2026-08-09', totalEvents: 356, criticalEvents: 4, accessEvents: 143, fireEvents: 2, parkingEvents: 88, aiEvents: 105, deviceEvents: 7 },
  { date: '2026-08-10', totalEvents: 461, criticalEvents: 11, accessEvents: 188, fireEvents: 3, parkingEvents: 113, aiEvents: 132, deviceEvents: 10 },
  { date: '2026-08-11', totalEvents: 214, criticalEvents: 2, accessEvents: 92, fireEvents: 0, parkingEvents: 51, aiEvents: 64, deviceEvents: 4 },
];

export const todaysReport = dailyReports[dailyReports.length - 1];
