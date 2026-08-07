import type { DoorLiveStatus } from '@/modules/access-control/types';

export const doorLiveStatus: DoorLiveStatus[] = [
  { id: 'DR-001', doorName: 'Main Entrance', building: 'Block A', floor: 'Ground Floor', doorStatus: 'closed', controllerStatus: 'online', readerStatus: 'online', lockStatus: 'locked', connectionStatus: 'online', lastActivity: '1 min ago' },
  { id: 'DR-002', doorName: 'Server Room', building: 'Block A', floor: 'Basement 2', doorStatus: 'closed', controllerStatus: 'online', readerStatus: 'online', lockStatus: 'locked', connectionStatus: 'online', lastActivity: '6 min ago' },
  { id: 'DR-003', doorName: 'Emergency Exit East', building: 'Block B', floor: 'Ground Floor', doorStatus: 'held-open', controllerStatus: 'online', readerStatus: 'warning', lockStatus: 'unlocked', connectionStatus: 'online', lastActivity: '22 min ago' },
  { id: 'DR-004', doorName: 'Loading Dock', building: 'Block C', floor: 'Ground Floor', doorStatus: 'closed', controllerStatus: 'offline', readerStatus: 'offline', lockStatus: 'locked', connectionStatus: 'offline', lastActivity: '1 hr ago' },
  { id: 'DR-005', doorName: 'Rooftop Access', building: 'Block A', floor: 'Roof', doorStatus: 'closed', controllerStatus: 'online', readerStatus: 'online', lockStatus: 'locked', connectionStatus: 'online', lastActivity: '3 min ago' },
  { id: 'DR-006', doorName: 'Finance Wing', building: 'Block B', floor: '3rd Floor', doorStatus: 'closed', controllerStatus: 'online', readerStatus: 'online', lockStatus: 'locked', connectionStatus: 'online', lastActivity: '9 min ago' },
  { id: 'DR-007', doorName: 'Data Center Airlock', building: 'Block C', floor: 'Basement 1', doorStatus: 'forced', controllerStatus: 'online', readerStatus: 'online', lockStatus: 'unlocked', connectionStatus: 'online', lastActivity: 'Just now' },
  { id: 'DR-008', doorName: 'Executive Lobby', building: 'Block A', floor: '5th Floor', doorStatus: 'closed', controllerStatus: 'online', readerStatus: 'online', lockStatus: 'locked', connectionStatus: 'online', lastActivity: '14 min ago' },
  { id: 'DR-009', doorName: 'Cafeteria Entrance', building: 'Block D', floor: 'Ground Floor', doorStatus: 'open', controllerStatus: 'online', readerStatus: 'online', lockStatus: 'unlocked', connectionStatus: 'online', lastActivity: '2 min ago' },
  { id: 'DR-010', doorName: 'Parking Basement Gate', building: 'Block C', floor: 'Basement 1', doorStatus: 'closed', controllerStatus: 'warning', readerStatus: 'online', lockStatus: 'locked', connectionStatus: 'warning', lastActivity: '31 min ago' },
];
