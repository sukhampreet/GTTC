import type { EnvironmentZoneReading } from '@/modules/live-monitoring/types';

export const environmentZones: EnvironmentZoneReading[] = [
  { id: 'ENV-01', zone: 'Block A — Lobby', temperatureC: 23.4, humidityPct: 48, aqi: 42, co2ppm: 512, pm25: 12, noiseDb: 44, powerKw: 18.2, status: 'online' },
  { id: 'ENV-02', zone: 'Block A — Server Room', temperatureC: 19.8, humidityPct: 39, aqi: 38, co2ppm: 470, pm25: 9, noiseDb: 58, powerKw: 62.5, status: 'online' },
  { id: 'ENV-03', zone: 'Block B — Finance Wing', temperatureC: 24.1, humidityPct: 51, aqi: 46, co2ppm: 540, pm25: 14, noiseDb: 41, powerKw: 12.4, status: 'online' },
  { id: 'ENV-04', zone: 'Block C — Warehouse', temperatureC: 27.6, humidityPct: 58, aqi: 61, co2ppm: 610, pm25: 22, noiseDb: 62, powerKw: 34.8, status: 'warning' },
  { id: 'ENV-05', zone: 'Block D — Cafeteria', temperatureC: 22.9, humidityPct: 46, aqi: 40, co2ppm: 498, pm25: 11, noiseDb: 55, powerKw: 21.1, status: 'online' },
  { id: 'ENV-06', zone: 'Campus — Courtyard', temperatureC: 29.3, humidityPct: 44, aqi: 55, co2ppm: 420, pm25: 18, noiseDb: 48, powerKw: 4.2, status: 'online' },
];
