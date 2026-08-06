import type { DoorRecord } from '@/types/mock';

export const doors: DoorRecord[] = [
  { id: 'DR-001', name: 'Main Entrance', location: 'Block A', status: 'online', lastEvent: 'Access Granted', lastEventAt: '1 min ago' },
  { id: 'DR-002', name: 'Server Room', location: 'Block A - B2', status: 'online', lastEvent: 'Access Denied', lastEventAt: '6 min ago' },
  { id: 'DR-003', name: 'Emergency Exit East', location: 'Block B', status: 'online', lastEvent: 'Door Held Open', lastEventAt: '22 min ago' },
  { id: 'DR-004', name: 'Loading Dock', location: 'Block C', status: 'offline', lastEvent: 'Device Offline', lastEventAt: '1 hr ago' },
  { id: 'DR-005', name: 'Rooftop Access', location: 'Block A - Roof', status: 'online', lastEvent: 'Access Granted', lastEventAt: '3 min ago' },
];
