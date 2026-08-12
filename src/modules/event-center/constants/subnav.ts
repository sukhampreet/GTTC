import {
  LayoutGrid,
  ShieldAlert,
  TriangleAlert,
  Info,
  History,
  Search,
  FileSearch,
  PlayCircle,
  Download,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';

export interface EventCenterNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const EVENT_CENTER_SUBNAV: EventCenterNavItem[] = [
  { id: 'home', label: 'Event Center', path: EVENT_CENTER_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'critical', label: 'Critical Events', path: EVENT_CENTER_PATHS.critical, icon: ShieldAlert },
  { id: 'warnings', label: 'Warnings', path: EVENT_CENTER_PATHS.warnings, icon: TriangleAlert },
  { id: 'information', label: 'Information', path: EVENT_CENTER_PATHS.information, icon: Info },
  { id: 'timeline', label: 'Event Timeline', path: EVENT_CENTER_PATHS.timeline, icon: History },
  { id: 'search', label: 'Event Search', path: EVENT_CENTER_PATHS.search, icon: Search },
  { id: 'details', label: 'Event Details', path: EVENT_CENTER_PATHS.details, icon: FileSearch },
  { id: 'replay', label: 'Event Replay', path: EVENT_CENTER_PATHS.replay, icon: PlayCircle },
  { id: 'export', label: 'Event Export', path: EVENT_CENTER_PATHS.export, icon: Download },
  { id: 'statistics', label: 'Event Statistics', path: EVENT_CENTER_PATHS.statistics, icon: BarChart3 },
];
