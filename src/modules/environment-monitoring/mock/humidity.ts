import type { HumidityReading, TrendPoint } from '@/modules/environment-monitoring/types';

export const HUMIDITY_THRESHOLD_PCT = 65;

export const humidityTrend: TrendPoint[] = [
  { label: '00:00', value: 52 },
  { label: '03:00', value: 55 },
  { label: '06:00', value: 58 },
  { label: '09:00', value: 54 },
  { label: '12:00', value: 47 },
  { label: '15:00', value: 42 },
  { label: '18:00', value: 45 },
  { label: '21:00', value: 50 },
];

export const humiditySensors: HumidityReading[] = [
  { id: 'HUM-01', name: 'Block A - Floor 1 Humidity Sensor', zone: 'Block A - Floor 1', current: 48, min: 40, max: 56, threshold: HUMIDITY_THRESHOLD_PCT, status: 'normal', health: 'online' },
  { id: 'HUM-02', name: 'Block A - Floor 2 Humidity Sensor', zone: 'Block A - Floor 2', current: 68, min: 52, max: 70, threshold: HUMIDITY_THRESHOLD_PCT, status: 'warning', health: 'warning' },
  { id: 'HUM-03', name: 'Cafeteria Humidity Sensor', zone: 'Cafeteria', current: 51, min: 44, max: 59, threshold: HUMIDITY_THRESHOLD_PCT, status: 'normal', health: 'online' },
  { id: 'HUM-04', name: 'Server Room Humidity Sensor', zone: 'Server Room', current: 39, min: 34, max: 44, threshold: 50, status: 'normal', health: 'online' },
  { id: 'HUM-05', name: 'Block C - Warehouse Humidity Sensor', zone: 'Block C - Warehouse', current: 74, min: 58, max: 78, threshold: HUMIDITY_THRESHOLD_PCT, status: 'critical', health: 'online' },
  { id: 'HUM-06', name: 'Lobby Humidity Sensor', zone: 'Lobby', current: 46, min: 41, max: 52, threshold: HUMIDITY_THRESHOLD_PCT, status: 'normal', health: 'online' },
];
