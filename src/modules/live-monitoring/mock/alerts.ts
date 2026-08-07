import type { LiveAlertEntry } from '@/modules/live-monitoring/types';

export const liveAlerts: LiveAlertEntry[] = [
  { id: 'ALT-9001', severity: 'Critical', time: 'Just now', location: 'Main Entrance · Block A', description: 'AI weapon detection triggered on live camera feed.', acknowledged: false },
  { id: 'ALT-9002', severity: 'Critical', time: '1 min ago', location: 'Data Center Airlock · Block C', description: 'Door held open beyond configured threshold.', acknowledged: false },
  { id: 'ALT-9003', severity: 'High', time: '3 min ago', location: 'North Perimeter Fence', description: 'Line-crossing intrusion detected after hours.', acknowledged: true },
  { id: 'ALT-9004', severity: 'High', time: '6 min ago', location: 'Warehouse Aisle 2 · Block C', description: 'Smoke sensor reading above alarm threshold.', acknowledged: true },
  { id: 'ALT-9005', severity: 'Medium', time: '9 min ago', location: 'Loading Dock · Block C', description: 'Camera feed lost — connection timeout.', acknowledged: false },
  { id: 'ALT-9006', severity: 'Medium', time: '12 min ago', location: 'Finance Wing · Block B', description: 'Access attempt with an expired credential.', acknowledged: true },
  { id: 'ALT-9007', severity: 'Low', time: '19 min ago', location: 'Server Room · Block A', description: 'Ambient temperature trending above baseline.', acknowledged: true },
  { id: 'ALT-9008', severity: 'Low', time: '31 min ago', location: 'Security Control Room · Block A', description: 'Scheduled device restart completed.', acknowledged: true },
];
