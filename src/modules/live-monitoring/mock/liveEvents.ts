import type { LiveEventEntry } from '@/modules/live-monitoring/types';

export const liveEvents: LiveEventEntry[] = [
  { id: 'EVT-3001', type: 'Weapon Detection', timestamp: 'Just now', priority: 'danger', module: 'AI Analytics', location: 'Main Entrance · Block A', status: 'new' },
  { id: 'EVT-3002', type: 'Door Forced Open', timestamp: '1 min ago', priority: 'danger', module: 'Access Control', location: 'Data Center Airlock · Block C', status: 'new' },
  { id: 'EVT-3003', type: 'Intrusion Alert', timestamp: '3 min ago', priority: 'danger', module: 'Video Surveillance', location: 'North Perimeter Fence', status: 'acknowledged' },
  { id: 'EVT-3004', type: 'Smoke Detected', timestamp: '6 min ago', priority: 'warning', module: 'Fire & Emergency', location: 'Warehouse Aisle 2 · Block C', status: 'acknowledged' },
  { id: 'EVT-3005', type: 'Camera Offline', timestamp: '9 min ago', priority: 'warning', module: 'Video Surveillance', location: 'Loading Dock · Block C', status: 'new' },
  { id: 'EVT-3006', type: 'Unauthorized Entry', timestamp: '12 min ago', priority: 'danger', module: 'Access Control', location: 'Finance Wing · Block B', status: 'acknowledged' },
  { id: 'EVT-3007', type: 'Parking Barrier Opened', timestamp: '15 min ago', priority: 'info', module: 'Smart Parking', location: 'Main Gate Boom Barrier', status: 'resolved' },
  { id: 'EVT-3008', type: 'Environmental Alert', timestamp: '19 min ago', priority: 'warning', module: 'Environment Monitoring', location: 'Server Room · Block A', status: 'acknowledged' },
  { id: 'EVT-3009', type: 'Emergency Call', timestamp: '24 min ago', priority: 'danger', module: 'Building Intercom', location: 'Rear Fire Exit · Block B', status: 'resolved' },
  { id: 'EVT-3010', type: 'System Restart', timestamp: '31 min ago', priority: 'info', module: 'Device Management', location: 'Security Control Room · Block A', status: 'resolved' },
  { id: 'EVT-3011', type: 'Camera Offline', timestamp: '38 min ago', priority: 'warning', module: 'Video Surveillance', location: 'Archive Storage · Block C', status: 'resolved' },
  { id: 'EVT-3012', type: 'Door Forced Open', timestamp: '45 min ago', priority: 'danger', module: 'Access Control', location: 'Emergency Exit East · Block B', status: 'resolved' },
  { id: 'EVT-3013', type: 'Intrusion Alert', timestamp: '52 min ago', priority: 'danger', module: 'Video Surveillance', location: 'South Perimeter Fence', status: 'resolved' },
  { id: 'EVT-3014', type: 'Environmental Alert', timestamp: '1 hr ago', priority: 'warning', module: 'Environment Monitoring', location: 'Basement Utility Room · Block A', status: 'resolved' },
  { id: 'EVT-3015', type: 'System Restart', timestamp: '1 hr ago', priority: 'info', module: 'Device Management', location: 'Substation Yard · Block C', status: 'resolved' },
];
