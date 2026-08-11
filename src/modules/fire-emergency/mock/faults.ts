import type { FaultEntry } from '@/modules/fire-emergency/types';

export const faultEntries: FaultEntry[] = [
  { id: 'FL-01', device: 'FP-04 — FACP-Block-D-01', faultType: 'Communication Loss', zone: 'Zone D', priority: 'critical', reportedTime: '38 min ago', status: 'open', assignedEngineer: 'Unassigned' },
  { id: 'FL-02', device: 'SM-033 — Loading Dock Sensor', faultType: 'Low Battery', zone: 'Zone C', priority: 'high', reportedTime: '2 days ago', status: 'in-progress', assignedEngineer: 'Suresh Pillai' },
  { id: 'FL-03', device: 'HT-005 — Loading Dock Sensor', faultType: 'Sensor Offline', zone: 'Zone C', priority: 'high', reportedTime: '3 days ago', status: 'in-progress', assignedEngineer: 'Suresh Pillai' },
  { id: 'FL-04', device: 'MCP-C-G01', faultType: 'Circuit Fault', zone: 'Zone C', priority: 'medium', reportedTime: '5 hrs ago', status: 'open', assignedEngineer: 'Unassigned' },
  { id: 'FL-05', device: 'FP-03 — FACP-Block-C-01', faultType: 'Battery Degraded', zone: 'Zone C', priority: 'low', reportedTime: '1 day ago', status: 'resolved', assignedEngineer: 'Rahul Nair' },
];
