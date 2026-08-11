import {
  LayoutGrid,
  FlameKindling,
  Thermometer,
  Siren,
  History,
  Radio,
  Volume2,
  MapPinned,
  HeartPulse,
  RotateCcw,
  Wrench,
  ScrollText,
  LifeBuoy,
  type LucideIcon,
} from 'lucide-react';

import { FIRE_EMERGENCY_PATHS } from '@/modules/fire-emergency/constants/paths';

export interface FireEmergencyNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const FIRE_EMERGENCY_SUBNAV: FireEmergencyNavItem[] = [
  { id: 'home', label: 'Fire Dashboard', path: FIRE_EMERGENCY_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'smoke', label: 'Smoke Detection', path: FIRE_EMERGENCY_PATHS.smoke, icon: FlameKindling },
  { id: 'heat', label: 'Heat Detection', path: FIRE_EMERGENCY_PATHS.heat, icon: Thermometer },
  { id: 'mcp', label: 'Manual Call Point', path: FIRE_EMERGENCY_PATHS.mcp, icon: Siren },
  { id: 'alarm-history', label: 'Alarm History', path: FIRE_EMERGENCY_PATHS.alarmHistory, icon: History },
  { id: 'broadcast', label: 'Emergency Broadcast', path: FIRE_EMERGENCY_PATHS.broadcast, icon: Radio },
  { id: 'pa', label: 'PA System', path: FIRE_EMERGENCY_PATHS.pa, icon: Volume2 },
  { id: 'zones', label: 'Zone Monitoring', path: FIRE_EMERGENCY_PATHS.zones, icon: MapPinned },
  { id: 'device-health', label: 'Device Health', path: FIRE_EMERGENCY_PATHS.deviceHealth, icon: HeartPulse },
  { id: 'alarm-reset', label: 'Alarm Reset', path: FIRE_EMERGENCY_PATHS.alarmReset, icon: RotateCcw },
  { id: 'faults', label: 'Fault Monitoring', path: FIRE_EMERGENCY_PATHS.faults, icon: Wrench },
  { id: 'event-logs', label: 'Event Logs', path: FIRE_EMERGENCY_PATHS.eventLogs, icon: ScrollText },
  { id: 'emergency-response', label: 'Emergency Response', path: FIRE_EMERGENCY_PATHS.emergencyResponse, icon: LifeBuoy },
];
