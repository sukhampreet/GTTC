import type { HeatSensor } from '@/modules/fire-emergency/types';

export const heatSensors: HeatSensor[] = [
  { id: 'HT-001', name: 'Kitchen Heat Sensor', building: 'Block D', floor: 'Ground Floor', temperature: 42, threshold: 68, status: 'normal', battery: 90, health: 'online', lastReading: '10 sec ago' },
  { id: 'HT-002', name: 'Server Room Heat Sensor', building: 'Block A', floor: 'Basement 2', temperature: 27, threshold: 55, status: 'normal', battery: 85, health: 'online', lastReading: '10 sec ago' },
  { id: 'HT-003', name: 'Generator Room Sensor', building: 'Block C', floor: 'Basement 1', temperature: 58, threshold: 65, status: 'elevated', battery: 71, health: 'online', lastReading: '22 sec ago' },
  { id: 'HT-004', name: 'Electrical Panel Sensor', building: 'Block B', floor: '1st Floor', temperature: 31, threshold: 60, status: 'normal', battery: 93, health: 'online', lastReading: '15 sec ago' },
  { id: 'HT-005', name: 'Loading Dock Sensor', building: 'Block C', floor: 'Ground Floor', temperature: 0, threshold: 60, status: 'offline', battery: 8, health: 'offline', lastReading: '3 days ago' },
  { id: 'HT-006', name: 'Boiler Room Sensor', building: 'Block D', floor: 'Basement 1', temperature: 71, threshold: 70, status: 'alarm', battery: 64, health: 'online', lastReading: 'Just now' },
];
