import type { MaintenanceRecord } from '@/modules/device-management/types';

export const maintenance: MaintenanceRecord[] = [
  { id: 'MNT-3301', device: 'FP-A-01', status: 'in-progress', scheduledDate: '2026-08-12 10:00', technician: 'K. Verma', notes: 'Investigating critical fault flagged on main fire panel bus.', priority: 'critical' },
  { id: 'MNT-3300', device: 'CAM-041', status: 'overdue', scheduledDate: '2026-08-10 09:00', technician: 'M. Iyer', notes: 'Camera offline for 14+ minutes; on-site inspection required.', priority: 'high' },
  { id: 'MNT-3299', device: 'BAR-ENT-02', status: 'scheduled', scheduledDate: '2026-08-13 14:00', technician: 'S. Nair', notes: 'Replace barrier motor gearbox — recurring overheating fault.', priority: 'high' },
  { id: 'MNT-3298', device: 'NVR-CORE-01', status: 'scheduled', scheduledDate: '2026-08-14 08:00', technician: 'M. Iyer', notes: 'Expand storage array — currently at 88% capacity.', priority: 'medium' },
  { id: 'MNT-3297', device: 'SW-CORE-01', status: 'scheduled', scheduledDate: '2026-08-15 22:00', technician: 'R. Sharma', notes: 'Apply firmware 15.2(7)E4 during maintenance window.', priority: 'medium' },
  { id: 'MNT-3296', device: 'IC-OUT-04', status: 'overdue', scheduledDate: '2026-08-09 11:00', technician: 'S. Nair', notes: 'Outdoor intercom unresponsive — check PoE injector and cabling.', priority: 'high' },
  { id: 'MNT-3295', device: 'AI-EDGE-03', status: 'in-progress', scheduledDate: '2026-08-11 20:00', technician: 'R. Sharma', notes: 'Scheduled firmware upgrade to v2.4.0 in progress.', priority: 'low' },
  { id: 'MNT-3294', device: 'ENV-SRV-01', status: 'completed', scheduledDate: '2026-08-08 09:30', technician: 'K. Verma', notes: 'Recalibrated temperature sensor — reading now within baseline.', priority: 'low' },
  { id: 'MNT-3293', device: 'DR-WEST-11', status: 'completed', scheduledDate: '2026-08-07 13:00', technician: 'M. Iyer', notes: 'Replaced door strike relay; firmware pending update.', priority: 'medium' },
  { id: 'MNT-3292', device: 'HT-B-009', status: 'completed', scheduledDate: '2026-08-05 10:15', technician: 'K. Verma', notes: 'Replaced heat sensor battery.', priority: 'low' },
  { id: 'MNT-3291', device: 'ANPR-ENT-01', status: 'completed', scheduledDate: '2026-08-02 08:00', technician: 'S. Nair', notes: 'Cleaned camera housing lens after dust accumulation report.', priority: 'low' },
  { id: 'MNT-3290', device: 'DB-PRIMARY', status: 'scheduled', scheduledDate: '2026-08-18 23:00', technician: 'R. Sharma', notes: 'Quarterly storage volume expansion and index optimization.', priority: 'medium' },
];
