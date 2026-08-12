import type { ReportHistoryEntry } from '@/modules/reports/types';

export const reportHistory: ReportHistoryEntry[] = [
  { id: 'RPT-1001', title: 'Daily Security Summary — Aug 11', category: 'Daily', generatedBy: 'System Scheduler', generatedDate: '2026-08-11 06:00', format: 'pdf', status: 'ready' },
  { id: 'RPT-1002', title: 'Weekly Incident Report — Week 32', category: 'Weekly', generatedBy: 'Admin', generatedDate: '2026-08-10 18:20', format: 'excel', status: 'ready' },
  { id: 'RPT-1003', title: 'Monthly AI Analytics — July 2026', category: 'Monthly', generatedBy: 'System Scheduler', generatedDate: '2026-08-01 07:00', format: 'pdf', status: 'ready' },
  { id: 'RPT-1004', title: 'Access Control Audit', category: 'Access', generatedBy: 'Security Manager', generatedDate: '2026-08-09 14:12', format: 'csv', status: 'ready' },
  { id: 'RPT-1005', title: 'Fire Alarm Compliance Report', category: 'Fire', generatedBy: 'Facility Manager', generatedDate: '2026-08-08 09:45', format: 'pdf', status: 'ready' },
  { id: 'RPT-1006', title: 'Parking Utilization — August W1', category: 'Parking', generatedBy: 'Admin', generatedDate: '2026-08-07 17:30', format: 'excel', status: 'generating' },
  { id: 'RPT-1007', title: 'Device Health Snapshot', category: 'Device', generatedBy: 'System Scheduler', generatedDate: '2026-08-11 05:30', format: 'csv', status: 'ready' },
  { id: 'RPT-1008', title: 'Attendance Report — July 2026', category: 'Attendance', generatedBy: 'HR Coordinator', generatedDate: '2026-08-01 08:00', format: 'excel', status: 'failed' },
];
