import type { AttendanceSummary, AttendanceTrendPoint } from '@/modules/reports/types';

export const attendanceSummary: AttendanceSummary = {
  totalEmployees: 486,
  present: 452,
  absent: 21,
  late: 13,
  attendanceRate: 93.0,
};

export const attendanceTrend: AttendanceTrendPoint[] = [
  { day: 'Mon', present: 458, absent: 19, late: 9 },
  { day: 'Tue', present: 461, absent: 16, late: 9 },
  { day: 'Wed', present: 447, absent: 25, late: 14 },
  { day: 'Thu', present: 452, absent: 21, late: 13 },
  { day: 'Fri', present: 439, absent: 30, late: 17 },
];
