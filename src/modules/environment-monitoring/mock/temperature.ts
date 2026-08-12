import type { TemperatureReading, TrendPoint } from '@/modules/environment-monitoring/types';

export const TEMPERATURE_THRESHOLD_C = 28;

export const temperatureTrend: TrendPoint[] = [
  { label: '00:00', value: 21.5 },
  { label: '03:00', value: 20.8 },
  { label: '06:00', value: 20.2 },
  { label: '09:00', value: 22.4 },
  { label: '12:00', value: 25.6 },
  { label: '15:00', value: 27.8 },
  { label: '18:00', value: 26.9 },
  { label: '21:00', value: 23.4 },
];

export const temperatureSensors: TemperatureReading[] = [
  { id: 'TMP-01', name: 'Block A - Floor 1 Sensor', zone: 'Block A - Floor 1', current: 23.4, min: 20.1, max: 27.2, threshold: TEMPERATURE_THRESHOLD_C, status: 'normal', health: 'online' },
  { id: 'TMP-02', name: 'Block A - Floor 2 Sensor', zone: 'Block A - Floor 2', current: 24.8, min: 21.0, max: 28.6, threshold: TEMPERATURE_THRESHOLD_C, status: 'warning', health: 'online' },
  { id: 'TMP-03', name: 'Server Room Sensor', zone: 'Server Room', current: 19.2, min: 18.0, max: 21.5, threshold: 24, status: 'normal', health: 'online' },
  { id: 'TMP-04', name: 'Cafeteria Sensor', zone: 'Cafeteria', current: 25.1, min: 22.4, max: 27.9, threshold: TEMPERATURE_THRESHOLD_C, status: 'normal', health: 'online' },
  { id: 'TMP-05', name: 'Block B - Floor 1 Sensor', zone: 'Block B - Floor 1', current: 29.6, min: 24.2, max: 30.8, threshold: TEMPERATURE_THRESHOLD_C, status: 'critical', health: 'warning' },
  { id: 'TMP-06', name: 'Block C - Warehouse Sensor', zone: 'Block C - Warehouse', current: 0, min: 0, max: 0, threshold: 30, status: 'normal', health: 'offline' },
  { id: 'TMP-07', name: 'Lobby Sensor', zone: 'Lobby', current: 22.9, min: 21.1, max: 24.7, threshold: TEMPERATURE_THRESHOLD_C, status: 'normal', health: 'online' },
];
