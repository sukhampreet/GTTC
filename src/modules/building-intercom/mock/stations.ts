import type { IndoorStation, OutdoorStation } from '@/modules/building-intercom/types';

export const indoorStations: IndoorStation[] = [
  { id: 'IDS-001', stationName: 'IDS-Block-A-101', building: 'Block A', floor: '1st Floor', room: 'Room 101', status: 'online', ipAddress: '10.20.4.11', firmware: 'v2.4.0', lastSeen: 'Just now', signalStrengthPct: 96, health: 'success' },
  { id: 'IDS-002', stationName: 'IDS-Block-A-204', building: 'Block A', floor: '2nd Floor', room: 'Room 204', status: 'online', ipAddress: '10.20.4.12', firmware: 'v2.4.0', lastSeen: '1 min ago', signalStrengthPct: 88, health: 'success' },
  { id: 'IDS-003', stationName: 'IDS-Block-B-Lobby', building: 'Block B', floor: 'Ground Floor', room: 'Reception', status: 'online', ipAddress: '10.20.4.13', firmware: 'v2.4.0', lastSeen: '3 min ago', signalStrengthPct: 91, health: 'success' },
  { id: 'IDS-004', stationName: 'IDS-Block-B-305', building: 'Block B', floor: '3rd Floor', room: 'Room 305', status: 'fault', ipAddress: '10.20.4.14', firmware: 'v2.3.6', lastSeen: '42 min ago', signalStrengthPct: 34, health: 'danger' },
  { id: 'IDS-005', stationName: 'IDS-Block-C-Server', building: 'Block C', floor: 'Basement 1', room: 'Server Room', status: 'online', ipAddress: '10.20.4.15', firmware: 'v2.4.0', lastSeen: '2 min ago', signalStrengthPct: 79, health: 'success' },
  { id: 'IDS-006', stationName: 'IDS-Block-C-Exec', building: 'Block C', floor: '5th Floor', room: 'Executive Suite', status: 'maintenance', ipAddress: '10.20.4.16', firmware: 'v2.3.6', lastSeen: '1 hr ago', signalStrengthPct: 61, health: 'warning' },
  { id: 'IDS-007', stationName: 'IDS-Block-D-Cafeteria', building: 'Block D', floor: 'Ground Floor', room: 'Cafeteria', status: 'online', ipAddress: '10.20.4.17', firmware: 'v2.4.0', lastSeen: 'Just now', signalStrengthPct: 94, health: 'success' },
  { id: 'IDS-008', stationName: 'IDS-Block-D-Gym', building: 'Block D', floor: '1st Floor', room: 'Fitness Center', status: 'offline', ipAddress: '10.20.4.18', firmware: 'v2.3.4', lastSeen: '3 hr ago', signalStrengthPct: 0, health: 'danger' },
  { id: 'IDS-009', stationName: 'IDS-Block-A-Security', building: 'Block A', floor: 'Ground Floor', room: 'Security Desk', status: 'online', ipAddress: '10.20.4.19', firmware: 'v2.4.0', lastSeen: 'Just now', signalStrengthPct: 99, health: 'success' },
  { id: 'IDS-010', stationName: 'IDS-Block-B-Rooftop', building: 'Block B', floor: 'Roof', room: 'Plant Room', status: 'online', ipAddress: '10.20.4.20', firmware: 'v2.4.0', lastSeen: '5 min ago', signalStrengthPct: 72, health: 'warning' },
];

export const outdoorStations: OutdoorStation[] = [
  { id: 'ODS-001', stationName: 'ODS-Main-Gate', location: 'Main Gate — Block A', cameraStatus: 'online', doorStatus: 'locked', callStatus: 'idle', ipAddress: '10.20.5.11', firmware: 'v1.8.2', health: 'success', onlineStatus: 'online', batteryPct: 100 },
  { id: 'ODS-002', stationName: 'ODS-Visitor-Entrance', location: 'Visitor Entrance — Block A', cameraStatus: 'online', doorStatus: 'unlocked', callStatus: 'in-call', ipAddress: '10.20.5.12', firmware: 'v1.8.2', health: 'success', onlineStatus: 'online', batteryPct: 98 },
  { id: 'ODS-003', stationName: 'ODS-Loading-Dock', location: 'Loading Dock — Block C', cameraStatus: 'warning', doorStatus: 'locked', callStatus: 'idle', ipAddress: '10.20.5.13', firmware: 'v1.7.9', health: 'warning', onlineStatus: 'maintenance', batteryPct: 87 },
  { id: 'ODS-004', stationName: 'ODS-Parking-Gate', location: 'Parking Basement Gate — Block C', cameraStatus: 'online', doorStatus: 'locked', callStatus: 'ringing', ipAddress: '10.20.5.14', firmware: 'v1.8.2', health: 'success', onlineStatus: 'online', batteryPct: 91 },
  { id: 'ODS-005', stationName: 'ODS-Emergency-East', location: 'Emergency Exit East — Block B', cameraStatus: 'offline', doorStatus: 'fault', callStatus: 'idle', ipAddress: '10.20.5.15', firmware: 'v1.7.5', health: 'danger', onlineStatus: 'offline', batteryPct: 12 },
  { id: 'ODS-006', stationName: 'ODS-Cafeteria-Yard', location: 'Cafeteria Yard — Block D', cameraStatus: 'online', doorStatus: 'locked', callStatus: 'idle', ipAddress: '10.20.5.16', firmware: 'v1.8.2', health: 'success', onlineStatus: 'online', batteryPct: 100 },
  { id: 'ODS-007', stationName: 'ODS-Rooftop-Access', location: 'Rooftop Access — Block A', cameraStatus: 'online', doorStatus: 'locked', callStatus: 'idle', ipAddress: '10.20.5.17', firmware: 'v1.8.2', health: 'success', onlineStatus: 'online', batteryPct: 95 },
];
