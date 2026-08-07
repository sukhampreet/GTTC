import type { BroadcastDevice, BroadcastGroup, BroadcastHistoryEntry } from '@/modules/building-intercom/types';

export const broadcastGroups: BroadcastGroup[] = [
  { id: 'GRP-01', name: 'All Outdoor Stations', zone: 'Facility Wide', deviceCount: 7 },
  { id: 'GRP-02', name: 'Block A — All Floors', zone: 'Block A', deviceCount: 4 },
  { id: 'GRP-03', name: 'Block B — All Floors', zone: 'Block B', deviceCount: 3 },
  { id: 'GRP-04', name: 'Emergency Exits', zone: 'Facility Wide', deviceCount: 2 },
  { id: 'GRP-05', name: 'Cafeteria & Common Areas', zone: 'Block D', deviceCount: 2 },
];

export const broadcastDevices: BroadcastDevice[] = [
  { id: 'BD-01', name: 'ODS-Main-Gate', group: 'All Outdoor Stations', status: 'online', selected: true },
  { id: 'BD-02', name: 'ODS-Visitor-Entrance', group: 'All Outdoor Stations', status: 'online', selected: true },
  { id: 'BD-03', name: 'ODS-Parking-Gate', group: 'All Outdoor Stations', status: 'online', selected: false },
  { id: 'BD-04', name: 'IDS-Block-A-101', group: 'Block A — All Floors', status: 'online', selected: false },
  { id: 'BD-05', name: 'IDS-Block-A-204', group: 'Block A — All Floors', status: 'online', selected: false },
  { id: 'BD-06', name: 'IDS-Block-D-Cafeteria', group: 'Cafeteria & Common Areas', status: 'online', selected: false },
  { id: 'BD-07', name: 'ODS-Emergency-East', group: 'Emergency Exits', status: 'offline', selected: false },
];

export const broadcastHistory: BroadcastHistoryEntry[] = [
  { id: 'BC-201', message: 'Fire drill scheduled at 3:00 PM today', group: 'All Outdoor Stations', scheduledAt: 'Today, 09:00', status: 'completed' },
  { id: 'BC-200', message: 'Visitor parking closed for maintenance', group: 'Block A — All Floors', scheduledAt: 'Today, 08:15', status: 'completed' },
  { id: 'BC-199', message: 'Evening security round announcement', group: 'Facility Wide', scheduledAt: 'Today, 18:00', status: 'scheduled' },
  { id: 'BC-198', message: 'Cafeteria closing early for cleaning', group: 'Cafeteria & Common Areas', scheduledAt: 'Yesterday, 16:30', status: 'completed' },
  { id: 'BC-197', message: 'Test broadcast — emergency zone', group: 'Emergency Exits', scheduledAt: 'Yesterday, 11:05', status: 'failed' },
];
