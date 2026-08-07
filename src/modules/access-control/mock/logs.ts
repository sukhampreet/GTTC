import type { AccessLogEntry } from '@/modules/access-control/types';

export const accessLogs: AccessLogEntry[] = [
  { id: 'LOG-10231', time: '09:41:12', userName: 'Aishwarya Rao', employeeId: 'EMP-1042', method: 'Face', door: 'Main Entrance', building: 'Block A', direction: 'in', status: 'granted', operator: 'System', remarks: '—' },
  { id: 'LOG-10230', time: '09:38:55', userName: 'Karthik Menon', employeeId: 'EMP-1108', method: 'Card', door: 'Finance Wing', building: 'Block B', direction: 'in', status: 'granted', operator: 'System', remarks: '—' },
  { id: 'LOG-10229', time: '09:35:20', userName: 'Unknown', employeeId: '—', method: 'Card', door: 'Server Room', building: 'Block A', direction: 'in', status: 'denied', operator: 'System', remarks: 'Invalid access level' },
  { id: 'LOG-10228', time: '09:31:47', userName: 'Divya Prasad', employeeId: 'EMP-1077', method: 'Face', door: 'Executive Lobby', building: 'Block A', direction: 'in', status: 'granted', operator: 'System', remarks: '—' },
  { id: 'LOG-10227', time: '09:28:03', userName: 'Rahul Nair', employeeId: 'EMP-1153', method: 'PIN', door: 'Data Center Airlock', building: 'Block C', direction: 'in', status: 'timeout', operator: 'System', remarks: 'PIN entry timed out' },
  { id: 'LOG-10226', time: '09:24:38', userName: 'Meera Iyer', employeeId: 'EMP-1029', method: 'Card', door: 'Cafeteria Entrance', building: 'Block D', direction: 'out', status: 'granted', operator: 'System', remarks: '—' },
  { id: 'LOG-10225', time: '09:19:15', userName: 'Suresh Pillai', employeeId: 'EMP-1201', method: 'Fingerprint', door: 'Loading Dock', building: 'Block C', direction: 'in', status: 'granted', operator: 'System', remarks: '—' },
  { id: 'LOG-10224', time: '09:12:59', userName: 'Unknown', employeeId: '—', method: 'Card', door: 'Emergency Exit East', building: 'Block B', direction: 'in', status: 'denied', operator: 'System', remarks: 'Blacklisted card' },
  { id: 'LOG-10223', time: '09:08:41', userName: 'Neha Verma', employeeId: 'EMP-1064', method: 'QR Code', door: 'Main Entrance', building: 'Block A', direction: 'in', status: 'granted', operator: 'Front Desk', remarks: 'Visitor pass' },
  { id: 'LOG-10222', time: '09:02:07', userName: 'Arjun Kumar', employeeId: 'EMP-1188', method: 'Card', door: 'Rooftop Access', building: 'Block A', direction: 'in', status: 'forced', operator: 'System', remarks: 'Door forced open alarm' },
  { id: 'LOG-10221', time: '08:57:33', userName: 'Pooja Shetty', employeeId: 'EMP-1091', method: 'Face', door: 'Finance Wing', building: 'Block B', direction: 'out', status: 'granted', operator: 'System', remarks: '—' },
  { id: 'LOG-10220', time: '08:51:18', userName: 'Vikram Joshi', employeeId: 'EMP-1132', method: 'Remote', door: 'Parking Basement Gate', building: 'Block C', direction: 'in', status: 'granted', operator: 'Security Desk', remarks: 'Remote unlock by operator' },
  { id: 'LOG-10219', time: '08:44:02', userName: 'Ananya Das', employeeId: 'EMP-1015', method: 'Card', door: 'Main Entrance', building: 'Block A', direction: 'in', status: 'granted', operator: 'System', remarks: '—' },
  { id: 'LOG-10218', time: '08:39:47', userName: 'Rohit Sharma', employeeId: 'EMP-1176', method: 'Card', door: 'Server Room', building: 'Block A', direction: 'in', status: 'denied', operator: 'System', remarks: 'Outside scheduled hours' },
  { id: 'LOG-10217', time: '08:33:29', userName: 'Kavya Reddy', employeeId: 'EMP-1053', method: 'Face', door: 'Cafeteria Entrance', building: 'Block D', direction: 'in', status: 'granted', operator: 'System', remarks: '—' },
];
