import type { EventLogEntry } from '@/modules/fire-emergency/types';

export const eventLogs: EventLogEntry[] = [
  { id: 'EV-4501', timestamp: '09:12:55', event: 'Smoke density threshold exceeded', device: 'SM-014', zone: 'Zone C', priority: 'major', operator: 'Rahul Nair', status: 'acknowledged', remarks: 'Awaiting site confirmation' },
  { id: 'EV-4500', timestamp: '08:58:02', event: 'Smoke alarm triggered', device: 'SM-052', zone: 'Zone B', priority: 'critical', operator: 'Rahul Nair', status: 'open', remarks: 'Fire team dispatched' },
  { id: 'EV-4499', timestamp: '08:15:44', event: 'Fire alarm test completed', device: 'FP-02', zone: 'Zone B', priority: 'minor', operator: 'Divya Prasad', status: 'resolved', remarks: 'Scheduled monthly test' },
  { id: 'EV-4498', timestamp: 'Yesterday 22:40', event: 'Heat alarm triggered', device: 'HT-006', zone: 'Zone D', priority: 'critical', operator: 'Vikram Joshi', status: 'resolved', remarks: 'False alarm — boiler startup heat' },
  { id: 'EV-4497', timestamp: 'Yesterday 17:05', event: 'Manual call point activated', device: 'MCP-C-201', zone: 'Zone C', priority: 'major', operator: 'Rahul Nair', status: 'resolved', remarks: 'Pending physical reset' },
  { id: 'EV-4496', timestamp: 'Yesterday 11:22', event: 'Sensor communication lost', device: 'SM-033', zone: 'Zone C', priority: 'minor', operator: 'System', status: 'open', remarks: 'Logged for maintenance' },
  { id: 'EV-4495', timestamp: '2 days ago', event: 'Fire panel fault cleared', device: 'FP-03', zone: 'Zone C', priority: 'major', operator: 'Divya Prasad', status: 'resolved', remarks: '—' },
];
