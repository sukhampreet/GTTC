import type { CameraRecord } from '@/types/mock';

export const cameras: CameraRecord[] = [
  { id: 'CAM-001', name: 'Main Gate Entry', ipAddress: '10.10.2.11', status: 'online', recording: true, aiEnabled: true, location: 'Main Gate', firmware: 'v4.2.1', lastSeen: '2 sec ago', health: 'success' },
  { id: 'CAM-002', name: 'Main Gate Exit', ipAddress: '10.10.2.12', status: 'online', recording: true, aiEnabled: true, location: 'Main Gate', firmware: 'v4.2.1', lastSeen: '2 sec ago', health: 'success' },
  { id: 'CAM-014', name: 'Admin Block Lobby', ipAddress: '10.10.2.34', status: 'online', recording: true, aiEnabled: false, location: 'Admin Block', firmware: 'v4.1.9', lastSeen: '5 sec ago', health: 'success' },
  { id: 'CAM-028', name: 'Parking Level 1 - A', ipAddress: '10.10.3.09', status: 'warning', recording: true, aiEnabled: true, location: 'Parking L1', firmware: 'v3.9.4', lastSeen: '48 sec ago', health: 'warning' },
  { id: 'CAM-041', name: 'Perimeter North', ipAddress: '10.10.4.02', status: 'offline', recording: false, aiEnabled: true, location: 'North Perimeter', firmware: 'v4.0.6', lastSeen: '14 min ago', health: 'danger' },
  { id: 'CAM-052', name: 'Cafeteria Entrance', ipAddress: '10.10.2.61', status: 'online', recording: true, aiEnabled: false, location: 'Cafeteria', firmware: 'v4.2.1', lastSeen: '3 sec ago', health: 'success' },
];
