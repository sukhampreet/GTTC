import {
  LayoutGrid,
  HardDrive,
  FileSearch,
  HeartPulse,
  Layers,
  Activity,
  UploadCloud,
  Wrench,
  Network,
  ScrollText,
  type LucideIcon,
} from 'lucide-react';

import { DEVICE_MANAGEMENT_PATHS } from '@/modules/device-management/constants/paths';

export interface DeviceManagementNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const DEVICE_MANAGEMENT_SUBNAV: DeviceManagementNavItem[] = [
  { id: 'home', label: 'Device Management', path: DEVICE_MANAGEMENT_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'inventory', label: 'Device Inventory', path: DEVICE_MANAGEMENT_PATHS.inventory, icon: HardDrive },
  { id: 'details', label: 'Device Details', path: DEVICE_MANAGEMENT_PATHS.details, icon: FileSearch },
  { id: 'health', label: 'Device Health', path: DEVICE_MANAGEMENT_PATHS.health, icon: HeartPulse },
  { id: 'groups', label: 'Device Groups', path: DEVICE_MANAGEMENT_PATHS.groups, icon: Layers },
  { id: 'diagnostics', label: 'Diagnostics', path: DEVICE_MANAGEMENT_PATHS.diagnostics, icon: Activity },
  { id: 'firmware', label: 'Firmware', path: DEVICE_MANAGEMENT_PATHS.firmware, icon: UploadCloud },
  { id: 'maintenance', label: 'Maintenance', path: DEVICE_MANAGEMENT_PATHS.maintenance, icon: Wrench },
  { id: 'network', label: 'Network Devices', path: DEVICE_MANAGEMENT_PATHS.network, icon: Network },
  { id: 'events', label: 'Device Events', path: DEVICE_MANAGEMENT_PATHS.events, icon: ScrollText },
];
