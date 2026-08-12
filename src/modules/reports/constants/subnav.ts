import {
  LayoutGrid,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  ShieldAlert,
  Users,
  ParkingSquare,
  FlameKindling,
  DoorOpen,
  BrainCircuit,
  ListTree,
  HardDrive,
  FileText,
  Download,
  type LucideIcon,
} from 'lucide-react';

import { REPORTS_PATHS } from '@/modules/reports/constants/paths';

export interface ReportsNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const REPORTS_SUBNAV: ReportsNavItem[] = [
  { id: 'home', label: 'Reports Home', path: REPORTS_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'daily', label: 'Daily Reports', path: REPORTS_PATHS.daily, icon: CalendarDays },
  { id: 'weekly', label: 'Weekly Reports', path: REPORTS_PATHS.weekly, icon: CalendarRange },
  { id: 'monthly', label: 'Monthly Reports', path: REPORTS_PATHS.monthly, icon: CalendarClock },
  { id: 'incident', label: 'Incident Reports', path: REPORTS_PATHS.incident, icon: ShieldAlert },
  { id: 'attendance', label: 'Attendance Reports', path: REPORTS_PATHS.attendance, icon: Users },
  { id: 'parking', label: 'Parking Reports', path: REPORTS_PATHS.parking, icon: ParkingSquare },
  { id: 'fire', label: 'Fire Reports', path: REPORTS_PATHS.fire, icon: FlameKindling },
  { id: 'access', label: 'Access Reports', path: REPORTS_PATHS.access, icon: DoorOpen },
  { id: 'ai', label: 'AI Reports', path: REPORTS_PATHS.ai, icon: BrainCircuit },
  { id: 'event', label: 'Event Reports', path: REPORTS_PATHS.event, icon: ListTree },
  { id: 'device', label: 'Device Reports', path: REPORTS_PATHS.device, icon: HardDrive },
  { id: 'details', label: 'Report Details', path: REPORTS_PATHS.details, icon: FileText },
  { id: 'export', label: 'Report Export', path: REPORTS_PATHS.export, icon: Download },
];
