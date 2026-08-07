import type { AttendanceRecord, AttendanceTrendPoint } from '@/modules/access-control/types';

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ATT-01', employeeId: 'EMP-1042', name: 'Aishwarya Rao', department: 'Executive', checkIn: '08:52', checkOut: null, status: 'present' },
  { id: 'ATT-02', employeeId: 'EMP-1108', name: 'Karthik Menon', department: 'Finance', checkIn: '09:04', checkOut: null, status: 'present' },
  { id: 'ATT-03', employeeId: 'EMP-1077', name: 'Divya Prasad', department: 'Operations', checkIn: '09:31', checkOut: null, status: 'late' },
  { id: 'ATT-04', employeeId: 'EMP-1153', name: 'Rahul Nair', department: 'Security', checkIn: '07:58', checkOut: null, status: 'present' },
  { id: 'ATT-05', employeeId: 'EMP-1029', name: 'Meera Iyer', department: 'HR', checkIn: null, checkOut: null, status: 'on-leave' },
  { id: 'ATT-06', employeeId: 'EMP-1201', name: 'Suresh Pillai', department: 'Logistics', checkIn: null, checkOut: null, status: 'absent' },
  { id: 'ATT-07', employeeId: 'EMP-1064', name: 'Neha Verma', department: 'Operations', checkIn: '08:47', checkOut: null, status: 'present' },
  { id: 'ATT-08', employeeId: 'EMP-1188', name: 'Arjun Kumar', department: 'IT', checkIn: '09:15', checkOut: null, status: 'late' },
];

export const dailyAttendanceTrend: AttendanceTrendPoint[] = [
  { label: '9 AM', present: 120, absent: 8, late: 6 },
  { label: '10 AM', present: 168, absent: 8, late: 9 },
  { label: '11 AM', present: 172, absent: 8, late: 9 },
  { label: '12 PM', present: 170, absent: 8, late: 9 },
  { label: '1 PM', present: 148, absent: 8, late: 9 },
  { label: '2 PM', present: 166, absent: 8, late: 9 },
  { label: '3 PM', present: 165, absent: 8, late: 9 },
];

export const weeklyAttendanceTrend: AttendanceTrendPoint[] = [
  { label: 'Mon', present: 174, absent: 6, late: 8 },
  { label: 'Tue', present: 171, absent: 9, late: 8 },
  { label: 'Wed', present: 176, absent: 5, late: 7 },
  { label: 'Thu', present: 169, absent: 10, late: 9 },
  { label: 'Fri', present: 172, absent: 8, late: 8 },
  { label: 'Sat', present: 96, absent: 4, late: 3 },
  { label: 'Sun', present: 12, absent: 2, late: 0 },
];
