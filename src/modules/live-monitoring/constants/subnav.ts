import {
  LayoutGrid,
  Grid3x3,
  Radio,
  BellRing,
  Building2,
  HardDrive,
  ParkingSquare,
  DoorOpen,
  FlameKindling,
  Thermometer,
  Map,
  type LucideIcon,
} from 'lucide-react';

import { LIVE_MONITORING_PATHS } from '@/modules/live-monitoring/constants/paths';

export interface LiveMonitoringNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const LIVE_MONITORING_SUBNAV: LiveMonitoringNavItem[] = [
  { id: 'home', label: 'Overview', path: LIVE_MONITORING_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'camera-wall', label: 'Camera Wall', path: LIVE_MONITORING_PATHS.cameraWall, icon: Grid3x3 },
  { id: 'events', label: 'Live Events', path: LIVE_MONITORING_PATHS.events, icon: Radio },
  { id: 'alerts', label: 'Live Alerts', path: LIVE_MONITORING_PATHS.alerts, icon: BellRing },
  { id: 'buildings', label: 'Building Status', path: LIVE_MONITORING_PATHS.buildings, icon: Building2 },
  { id: 'devices', label: 'Device Status', path: LIVE_MONITORING_PATHS.devices, icon: HardDrive },
  { id: 'parking', label: 'Live Parking Status', path: LIVE_MONITORING_PATHS.parking, icon: ParkingSquare },
  { id: 'access', label: 'Live Access Status', path: LIVE_MONITORING_PATHS.access, icon: DoorOpen },
  { id: 'fire', label: 'Live Fire Status', path: LIVE_MONITORING_PATHS.fire, icon: FlameKindling },
  { id: 'environment', label: 'Live Environment Status', path: LIVE_MONITORING_PATHS.environment, icon: Thermometer },
  { id: 'campus', label: 'Campus Overview', path: LIVE_MONITORING_PATHS.campus, icon: Map },
];
