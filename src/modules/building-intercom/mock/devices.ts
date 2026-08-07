import type { DeviceWarning, RemoteDoor } from '@/modules/building-intercom/types';

export const remoteDoors: RemoteDoor[] = [
  { id: 'RD-01', doorName: 'Main Gate', station: 'ODS-Main-Gate', building: 'Block A', lockStatus: 'locked', doorHealth: 'success', onlineStatus: 'online' },
  { id: 'RD-02', doorName: 'Visitor Entrance', station: 'ODS-Visitor-Entrance', building: 'Block A', lockStatus: 'unlocked', doorHealth: 'success', onlineStatus: 'online' },
  { id: 'RD-03', doorName: 'Loading Dock', station: 'ODS-Loading-Dock', building: 'Block C', lockStatus: 'locked', doorHealth: 'warning', onlineStatus: 'warning' },
  { id: 'RD-04', doorName: 'Parking Basement Gate', station: 'ODS-Parking-Gate', building: 'Block C', lockStatus: 'locked', doorHealth: 'success', onlineStatus: 'online' },
  { id: 'RD-05', doorName: 'Emergency Exit East', station: 'ODS-Emergency-East', building: 'Block B', lockStatus: 'locked', doorHealth: 'danger', onlineStatus: 'offline' },
  { id: 'RD-06', doorName: 'Cafeteria Yard Gate', station: 'ODS-Cafeteria-Yard', building: 'Block D', lockStatus: 'locked', doorHealth: 'success', onlineStatus: 'online' },
  { id: 'RD-07', doorName: 'Rooftop Access', station: 'ODS-Rooftop-Access', building: 'Block A', lockStatus: 'locked', doorHealth: 'success', onlineStatus: 'online' },
];

export const deviceWarnings: DeviceWarning[] = [
  { id: 'DW-01', device: 'ODS-Emergency-East', message: 'Camera link offline — battery below 15%', tone: 'danger', timestamp: '6 min ago' },
  { id: 'DW-02', device: 'IDS-Block-B-305', message: 'Signal strength critically low (34%)', tone: 'danger', timestamp: '18 min ago' },
  { id: 'DW-03', device: 'ODS-Loading-Dock', message: 'Camera feed degraded, scheduled for maintenance', tone: 'warning', timestamp: '35 min ago' },
  { id: 'DW-04', device: 'IDS-Block-C-Exec', message: 'Firmware update pending — v2.4.0 available', tone: 'warning', timestamp: '1 hr ago' },
  { id: 'DW-05', device: 'IDS-Block-B-Rooftop', message: 'Intermittent signal drops detected', tone: 'warning', timestamp: '2 hr ago' },
];
