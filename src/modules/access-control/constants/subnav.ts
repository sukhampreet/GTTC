import {
  LayoutGrid,
  DoorClosed,
  ScrollText,
  ScanFace,
  CreditCard,
  UserRoundCheck,
  Users,
  ToggleLeft,
  CalendarCheck2,
  Clock,
  KeyRound,
  Repeat,
  ShieldBan,
  Siren,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';

import { ACCESS_CONTROL_PATHS } from '@/modules/access-control/constants/paths';

export interface AccessControlNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const ACCESS_CONTROL_SUBNAV: AccessControlNavItem[] = [
  { id: 'home', label: 'Overview', path: ACCESS_CONTROL_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'door-status', label: 'Live Door Status', path: ACCESS_CONTROL_PATHS.doorStatus, icon: DoorClosed },
  { id: 'logs', label: 'Access Logs', path: ACCESS_CONTROL_PATHS.logs, icon: ScrollText },
  { id: 'faces', label: 'Face Management', path: ACCESS_CONTROL_PATHS.faces, icon: ScanFace },
  { id: 'cards', label: 'Card Management', path: ACCESS_CONTROL_PATHS.cards, icon: CreditCard },
  { id: 'visitors', label: 'Visitor Management', path: ACCESS_CONTROL_PATHS.visitors, icon: UserRoundCheck },
  { id: 'employees', label: 'Employee Management', path: ACCESS_CONTROL_PATHS.employees, icon: Users },
  { id: 'door-control', label: 'Door Control', path: ACCESS_CONTROL_PATHS.doorControl, icon: ToggleLeft },
  { id: 'attendance', label: 'Attendance', path: ACCESS_CONTROL_PATHS.attendance, icon: CalendarCheck2 },
  { id: 'schedule', label: 'Time Schedule', path: ACCESS_CONTROL_PATHS.schedule, icon: Clock },
  { id: 'permissions', label: 'Access Permissions', path: ACCESS_CONTROL_PATHS.permissions, icon: KeyRound },
  { id: 'anti-passback', label: 'Anti Passback', path: ACCESS_CONTROL_PATHS.antiPassback, icon: Repeat },
  { id: 'blacklist', label: 'Blacklist', path: ACCESS_CONTROL_PATHS.blacklist, icon: ShieldBan },
  { id: 'emergency', label: 'Emergency Unlock', path: ACCESS_CONTROL_PATHS.emergency, icon: Siren },
  { id: 'devices', label: 'Device Configuration', path: ACCESS_CONTROL_PATHS.devices, icon: SlidersHorizontal },
];
