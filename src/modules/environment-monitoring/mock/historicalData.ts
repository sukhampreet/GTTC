import type { TrendPoint } from '@/modules/environment-monitoring/types';

export const temperatureHistory: TrendPoint[] = [
  { label: 'Mon', value: 23.1 },
  { label: 'Tue', value: 24.2 },
  { label: 'Wed', value: 25.6 },
  { label: 'Thu', value: 24.8 },
  { label: 'Fri', value: 26.3 },
  { label: 'Sat', value: 22.9 },
  { label: 'Sun', value: 23.5 },
];

export const humidityHistory: TrendPoint[] = [
  { label: 'Mon', value: 50 },
  { label: 'Tue', value: 53 },
  { label: 'Wed', value: 48 },
  { label: 'Thu', value: 55 },
  { label: 'Fri', value: 46 },
  { label: 'Sat', value: 44 },
  { label: 'Sun', value: 49 },
];

export const aqiHistory: TrendPoint[] = [
  { label: 'Mon', value: 44 },
  { label: 'Tue', value: 48 },
  { label: 'Wed', value: 52 },
  { label: 'Thu', value: 46 },
  { label: 'Fri', value: 58 },
  { label: 'Sat', value: 40 },
  { label: 'Sun', value: 39 },
];

export const co2History: TrendPoint[] = [
  { label: 'Mon', value: 510 },
  { label: 'Tue', value: 540 },
  { label: 'Wed', value: 560 },
  { label: 'Thu', value: 520 },
  { label: 'Fri', value: 605 },
  { label: 'Sat', value: 470 },
  { label: 'Sun', value: 455 },
];

export const energyHistory: TrendPoint[] = [
  { label: 'Mon', value: 412 },
  { label: 'Tue', value: 438 },
  { label: 'Wed', value: 456 },
  { label: 'Thu', value: 421 },
  { label: 'Fri', value: 468 },
  { label: 'Sat', value: 310 },
  { label: 'Sun', value: 285 },
];

export const occupancyHistory: TrendPoint[] = [
  { label: 'Mon', value: 245 },
  { label: 'Tue', value: 262 },
  { label: 'Wed', value: 258 },
  { label: 'Thu', value: 271 },
  { label: 'Fri', value: 249 },
  { label: 'Sat', value: 62 },
  { label: 'Sun', value: 40 },
];
