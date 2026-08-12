import type { AirQualityReading } from '@/modules/environment-monitoring/types';

export const airQualityZones: AirQualityReading[] = [
  { id: 'AQ-01', zone: 'Block A - Floor 1', aqi: 42, co2ppm: 512, pm25: 12, pm10: 20, voc: 0.3, status: 'good', health: 'online' },
  { id: 'AQ-02', zone: 'Server Room', aqi: 38, co2ppm: 470, pm25: 9, pm10: 15, voc: 0.2, status: 'good', health: 'online' },
  { id: 'AQ-03', zone: 'Block B - Finance Wing', aqi: 46, co2ppm: 540, pm25: 14, pm10: 24, voc: 0.35, status: 'moderate', health: 'online' },
  { id: 'AQ-04', zone: 'Block C - Warehouse', aqi: 118, co2ppm: 900, pm25: 55, pm10: 88, voc: 0.9, status: 'poor', health: 'warning' },
  { id: 'AQ-05', zone: 'Cafeteria', aqi: 40, co2ppm: 498, pm25: 11, pm10: 18, voc: 0.25, status: 'good', health: 'online' },
  { id: 'AQ-06', zone: 'Basement Parking', aqi: 165, co2ppm: 1150, pm25: 78, pm10: 120, voc: 1.4, status: 'critical', health: 'online' },
];
