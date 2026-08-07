import type { TimeScheduleRecord } from '@/modules/access-control/types';

export const timeScheduleRecords: TimeScheduleRecord[] = [
  { id: 'TS-01', name: 'General Shift', shiftGroup: 'Staff', startTime: '09:00', endTime: '18:00', activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], appliesToHolidays: false, status: 'active' },
  { id: 'TS-02', name: 'Security Rotation A', shiftGroup: 'Security', startTime: '06:00', endTime: '14:00', activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], appliesToHolidays: true, status: 'active' },
  { id: 'TS-03', name: 'Security Rotation B', shiftGroup: 'Security', startTime: '14:00', endTime: '22:00', activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], appliesToHolidays: true, status: 'active' },
  { id: 'TS-04', name: 'Night Watch', shiftGroup: 'Security', startTime: '22:00', endTime: '06:00', activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], appliesToHolidays: true, status: 'active' },
  { id: 'TS-05', name: 'Executive Access', shiftGroup: 'Executives', startTime: '00:00', endTime: '23:59', activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], appliesToHolidays: true, status: 'active' },
  { id: 'TS-06', name: 'Vendor Window', shiftGroup: 'Contractors', startTime: '10:00', endTime: '16:00', activeDays: ['Mon', 'Wed', 'Fri'], appliesToHolidays: false, status: 'inactive' },
];

export const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
