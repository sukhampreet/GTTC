import type { EnvironmentSensorRecord } from '@/types/mock';

export const environmentSensors: EnvironmentSensorRecord[] = [
  { id: 'ENV-01', zone: 'Block A - Floor 1', temperatureC: 23.4, humidityPct: 48, aqi: 42, status: 'online' },
  { id: 'ENV-02', zone: 'Block A - Floor 2', temperatureC: 24.1, humidityPct: 51, aqi: 39, status: 'online' },
  { id: 'ENV-03', zone: 'Server Room', temperatureC: 19.8, humidityPct: 39, aqi: 21, status: 'online' },
  { id: 'ENV-04', zone: 'Cafeteria', temperatureC: 25.6, humidityPct: 55, aqi: 58, status: 'warning' },
  { id: 'ENV-05', zone: 'Parking Level 1', temperatureC: 27.2, humidityPct: 60, aqi: 71, status: 'online' },
];
