import {
  LayoutGrid,
  SlidersHorizontal,
  Palette,
  Network,
  BellRing,
  Mail,
  MessageSquareText,
  DatabaseBackup,
  History as RestoreIcon,
  Database,
  Boxes,
  ScrollText,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react';

import { SETTINGS_PATHS } from '@/modules/settings/constants/paths';

export interface SettingsNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const SETTINGS_SUBNAV: SettingsNavItem[] = [
  { id: 'overview', label: 'System Overview', path: SETTINGS_PATHS.overview, icon: LayoutGrid, end: true },
  { id: 'general', label: 'General Settings', path: SETTINGS_PATHS.general, icon: SlidersHorizontal },
  { id: 'appearance', label: 'Appearance', path: SETTINGS_PATHS.appearance, icon: Palette },
  { id: 'network', label: 'Network', path: SETTINGS_PATHS.network, icon: Network },
  { id: 'notifications', label: 'Notifications', path: SETTINGS_PATHS.notifications, icon: BellRing },
  { id: 'email', label: 'Email / SMTP', path: SETTINGS_PATHS.email, icon: Mail },
  { id: 'sms', label: 'SMS', path: SETTINGS_PATHS.sms, icon: MessageSquareText },
  { id: 'backup', label: 'Backup', path: SETTINGS_PATHS.backup, icon: DatabaseBackup },
  { id: 'restore', label: 'Restore', path: SETTINGS_PATHS.restore, icon: RestoreIcon },
  { id: 'database', label: 'Database', path: SETTINGS_PATHS.database, icon: Database },
  { id: 'services', label: 'Docker / Services', path: SETTINGS_PATHS.services, icon: Boxes },
  { id: 'logs', label: 'System Logs', path: SETTINGS_PATHS.logs, icon: ScrollText },
  { id: 'audit', label: 'Audit Logs', path: SETTINGS_PATHS.audit, icon: ShieldAlert },
];
