import type { EnvironmentSensor } from '@/modules/environment-monitoring/types';

export const environmentSensors: EnvironmentSensor[] = [
  { id: 'TMP-01', name: 'Block A - Floor 1 Sensor', type: 'Temperature', location: 'Block A - Floor 1', status: 'online', battery: 91, signalStrength: 96, lastReading: '10 sec ago', health: 'online' },
  { id: 'TMP-02', name: 'Block A - Floor 2 Sensor', type: 'Temperature', location: 'Block A - Floor 2', status: 'online', battery: 84, signalStrength: 90, lastReading: '12 sec ago', health: 'online' },
  { id: 'TMP-03', name: 'Server Room Sensor', type: 'Temperature', location: 'Server Room', status: 'online', battery: 88, signalStrength: 94, lastReading: '8 sec ago', health: 'online' },
  { id: 'TMP-05', name: 'Block B - Floor 1 Sensor', type: 'Temperature', location: 'Block B - Floor 1', status: 'warning', battery: 62, signalStrength: 71, lastReading: '2 min ago', health: 'warning' },
  { id: 'TMP-06', name: 'Block C - Warehouse Sensor', type: 'Temperature', location: 'Block C - Warehouse', status: 'offline', battery: 14, signalStrength: 0, lastReading: '3 hrs ago', health: 'offline' },
  { id: 'HUM-01', name: 'Block A - Floor 1 Humidity Sensor', type: 'Humidity', location: 'Block A - Floor 1', status: 'online', battery: 89, signalStrength: 95, lastReading: '15 sec ago', health: 'online' },
  { id: 'HUM-02', name: 'Block A - Floor 2 Humidity Sensor', type: 'Humidity', location: 'Block A - Floor 2', status: 'warning', battery: 55, signalStrength: 68, lastReading: '4 min ago', health: 'warning' },
  { id: 'HUM-03', name: 'Cafeteria Humidity Sensor', type: 'Humidity', location: 'Cafeteria', status: 'online', battery: 93, signalStrength: 97, lastReading: '9 sec ago', health: 'online' },
  { id: 'AQ-01', name: 'Block A - Floor 1 Air Sensor', type: 'Air Quality', location: 'Block A - Floor 1', status: 'online', battery: 90, signalStrength: 93, lastReading: '20 sec ago', health: 'online' },
  { id: 'AQ-04', name: 'Block C - Warehouse Air Sensor', type: 'Air Quality', location: 'Block C - Warehouse', status: 'warning', battery: 47, signalStrength: 60, lastReading: '5 min ago', health: 'warning' },
  { id: 'AQ-06', name: 'Basement Parking Air Sensor', type: 'Air Quality', location: 'Basement Parking', status: 'online', battery: 76, signalStrength: 82, lastReading: '18 sec ago', health: 'online' },
  { id: 'OC-01', name: 'Ground Floor Occupancy Sensor', type: 'Occupancy', location: 'Block A - Ground Floor', status: 'online', battery: 95, signalStrength: 98, lastReading: '5 sec ago', health: 'online' },
  { id: 'OC-05', name: 'Conference Center Occupancy Sensor', type: 'Occupancy', location: 'Conference Center', status: 'online', battery: 81, signalStrength: 88, lastReading: '11 sec ago', health: 'online' },
  { id: 'EN-01', name: 'Block A Energy Meter', type: 'Energy Meter', location: 'Block A', status: 'online', battery: 100, signalStrength: 99, lastReading: '4 sec ago', health: 'online' },
  { id: 'EN-03', name: 'Server Room Energy Meter', type: 'Energy Meter', location: 'Server Room', status: 'online', battery: 100, signalStrength: 99, lastReading: '4 sec ago', health: 'online' },
  { id: 'EN-04', name: 'Block C - Warehouse Energy Meter', type: 'Energy Meter', location: 'Block C - Warehouse', status: 'offline', battery: 9, signalStrength: 0, lastReading: '6 hrs ago', health: 'offline' },
];
