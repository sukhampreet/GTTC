import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

export type ThresholdStatus = 'normal' | 'warning' | 'critical';

export type EnvironmentSensorType = 'Temperature' | 'Humidity' | 'Air Quality' | 'Occupancy' | 'Energy Meter';

export interface EnvironmentSensor {
  id: string;
  name: string;
  type: EnvironmentSensorType;
  location: string;
  status: DeviceOnlineStatus;
  battery: number;
  signalStrength: number;
  lastReading: string;
  health: DeviceOnlineStatus;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface TemperatureReading {
  id: string;
  name: string;
  zone: string;
  current: number;
  min: number;
  max: number;
  threshold: number;
  status: ThresholdStatus;
  health: DeviceOnlineStatus;
}

export interface HumidityReading {
  id: string;
  name: string;
  zone: string;
  current: number;
  min: number;
  max: number;
  threshold: number;
  status: ThresholdStatus;
  health: DeviceOnlineStatus;
}

export type AirQualityStatus = 'good' | 'moderate' | 'poor' | 'critical';

export interface AirQualityReading {
  id: string;
  zone: string;
  aqi: number;
  co2ppm: number;
  pm25: number;
  pm10: number;
  voc: number;
  status: AirQualityStatus;
  health: DeviceOnlineStatus;
}

export interface OccupancyReading {
  id: string;
  floor: string;
  building: string;
  current: number;
  capacity: number;
  peak: number;
}

export interface EnergyReading {
  id: string;
  zone: string;
  currentKw: number;
  dailyKwh: number;
  weeklyKwh: number;
  monthlyKwh: number;
  peakKw: number;
}

export type LightingState = 'on' | 'off';

export interface LightingZone {
  id: string;
  zoneName: string;
  building: string;
  state: LightingState;
  brightnessPct: number;
  energyKw: number;
  fixtureCount: number;
  health: DeviceOnlineStatus;
}

export type HVACMode = 'cooling' | 'heating' | 'auto' | 'off';

export interface HVACUnit {
  id: string;
  unitName: string;
  zone: string;
  setpointC: number;
  currentTempC: number;
  mode: HVACMode;
  running: boolean;
  health: DeviceOnlineStatus;
}

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface EnvironmentAlert {
  id: string;
  type: string;
  severity: AlertSeverity;
  timestamp: string;
  location: string;
  sensor: string;
  description: string;
  status: AlertStatus;
}

export interface DeviceHealth {
  id: string;
  label: string;
  online: number;
  offline: number;
  warning: number;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  tone: StatusTone;
  timestamp: string;
}
