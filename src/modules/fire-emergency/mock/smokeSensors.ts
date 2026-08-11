import type { SmokeSensor } from '@/modules/fire-emergency/types';

export const smokeSensors: SmokeSensor[] = [
  { id: 'SM-001', name: 'Corridor Sensor 1', building: 'Block A', floor: 'Ground Floor', zone: 'Zone A', smokeLevel: 4, status: 'normal', battery: 91, signalStrength: 96, lastTriggered: 'Never', health: 'online' },
  { id: 'SM-002', name: 'Server Room Sensor', building: 'Block A', floor: 'Basement 2', zone: 'Zone A', smokeLevel: 6, status: 'normal', battery: 88, signalStrength: 94, lastTriggered: 'Never', health: 'online' },
  { id: 'SM-014', name: 'Level 2 East Sensor', building: 'Block C', floor: '2nd Floor', zone: 'Zone C', smokeLevel: 62, status: 'warning', battery: 74, signalStrength: 81, lastTriggered: '14 min ago', health: 'online' },
  { id: 'SM-021', name: 'Cafeteria Sensor', building: 'Block D', floor: 'Ground Floor', zone: 'Zone D', smokeLevel: 3, status: 'normal', battery: 95, signalStrength: 98, lastTriggered: 'Never', health: 'online' },
  { id: 'SM-033', name: 'Loading Dock Sensor', building: 'Block C', floor: 'Ground Floor', zone: 'Zone C', smokeLevel: 0, status: 'offline', battery: 12, signalStrength: 0, lastTriggered: '2 days ago', health: 'offline' },
  { id: 'SM-045', name: 'Executive Lobby Sensor', building: 'Block A', floor: '5th Floor', zone: 'Zone A', smokeLevel: 5, status: 'normal', battery: 89, signalStrength: 92, lastTriggered: 'Never', health: 'online' },
  { id: 'SM-052', name: 'Finance Wing Sensor', building: 'Block B', floor: '3rd Floor', zone: 'Zone B', smokeLevel: 91, status: 'alarm', battery: 67, signalStrength: 88, lastTriggered: 'Just now', health: 'online' },
  { id: 'SM-060', name: 'Rooftop Sensor', building: 'Block A', floor: 'Roof', zone: 'Zone A', smokeLevel: 2, status: 'normal', battery: 80, signalStrength: 90, lastTriggered: 'Never', health: 'online' },
];
