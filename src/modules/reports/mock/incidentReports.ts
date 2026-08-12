import type { IncidentReportEntry } from '@/modules/reports/types';

export const incidentReports: IncidentReportEntry[] = [
  { id: 'INC-2001', date: '2026-08-11', time: '08:31', type: 'Perimeter Intrusion', module: 'AI Analytics', location: 'Perimeter Zone D', severity: 'critical', status: 'in-progress', assignedOperator: 'R. Kapoor', resolution: 'Security dispatched, awaiting on-site confirmation.' },
  { id: 'INC-2002', date: '2026-08-11', time: '07:58', type: 'Crowd Threshold Exceeded', module: 'AI Analytics', location: 'Auditorium Entrance', severity: 'high', status: 'resolved', assignedOperator: 'S. Menon', resolution: 'Additional entry lane opened, crowd dispersed.' },
  { id: 'INC-2003', date: '2026-08-10', time: '23:52', type: 'Suspicious Behavior', module: 'AI Analytics', location: 'West Perimeter', severity: 'critical', status: 'in-progress', assignedOperator: 'R. Kapoor', resolution: 'Under investigation by night shift security.' },
  { id: 'INC-2004', date: '2026-08-10', time: '14:12', type: 'Unauthorized Access Attempt', module: 'Access Control', location: 'Server Room B', severity: 'high', status: 'resolved', assignedOperator: 'A. Fernandes', resolution: 'Card revoked, employee re-briefed on protocol.' },
  { id: 'INC-2005', date: '2026-08-09', time: '11:04', type: 'Smoke Sensor Warning', module: 'Fire & Emergency', location: 'Block C 2nd Floor', severity: 'medium', status: 'resolved', assignedOperator: 'Facility Team', resolution: 'False alarm — dust triggered sensor, cleaned and reset.' },
  { id: 'INC-2006', date: '2026-08-08', time: '19:47', type: 'Parking Barrier Fault', module: 'Smart Parking', location: 'Main Entry Gate', severity: 'low', status: 'resolved', assignedOperator: 'Facility Team', resolution: 'Barrier motor replaced.' },
  { id: 'INC-2007', date: '2026-08-07', time: '03:15', type: 'Device Offline', module: 'Device Management', location: 'CAM-Rooftop-01', severity: 'medium', status: 'open', assignedOperator: 'IT Support', resolution: 'Pending field technician visit.' },
];
