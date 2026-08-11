import {
  LayoutGrid,
  Thermometer,
  Droplets,
  Wind,
  Users,
  Zap,
  Lightbulb,
  Fan,
  AlertTriangle,
  LineChart,
  HardDrive,
  type LucideIcon,
} from 'lucide-react';

import { ENVIRONMENT_MONITORING_PATHS } from '@/modules/environment-monitoring/constants/paths';

export interface EnvironmentMonitoringNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const ENVIRONMENT_MONITORING_SUBNAV: EnvironmentMonitoringNavItem[] = [
  { id: 'home', label: 'Overview', path: ENVIRONMENT_MONITORING_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'temperature', label: 'Temperature', path: ENVIRONMENT_MONITORING_PATHS.temperature, icon: Thermometer },
  { id: 'humidity', label: 'Humidity', path: ENVIRONMENT_MONITORING_PATHS.humidity, icon: Droplets },
  { id: 'air-quality', label: 'Air Quality', path: ENVIRONMENT_MONITORING_PATHS.airQuality, icon: Wind },
  { id: 'occupancy', label: 'Occupancy', path: ENVIRONMENT_MONITORING_PATHS.occupancy, icon: Users },
  { id: 'energy-usage', label: 'Energy Usage', path: ENVIRONMENT_MONITORING_PATHS.energyUsage, icon: Zap },
  { id: 'lighting', label: 'Lighting', path: ENVIRONMENT_MONITORING_PATHS.lighting, icon: Lightbulb },
  { id: 'hvac', label: 'HVAC', path: ENVIRONMENT_MONITORING_PATHS.hvac, icon: Fan },
  { id: 'alerts', label: 'Alerts', path: ENVIRONMENT_MONITORING_PATHS.alerts, icon: AlertTriangle },
  { id: 'historical-graphs', label: 'Historical Graphs', path: ENVIRONMENT_MONITORING_PATHS.historicalGraphs, icon: LineChart },
  { id: 'device-status', label: 'Device Status', path: ENVIRONMENT_MONITORING_PATHS.deviceStatus, icon: HardDrive },
];
