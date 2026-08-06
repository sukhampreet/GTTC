import {
  LayoutDashboard,
  MonitorPlay,
  Video,
  DoorOpen,
  PhoneCall,
  FlameKindling,
  ParkingSquare,
  Thermometer,
  ListTree,
  HardDrive,
  BrainCircuit,
  FileBarChart,
  Users,
  Settings,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import type { NavItem } from '@/types/navigation';

/**
 * Single source of truth for the primary sidebar navigation.
 * Order and labels must mirror context.md "Sidebar Structure" exactly.
 */
export const NAVIGATION_CONFIG: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: ROUTES.dashboard, icon: LayoutDashboard },
  { id: 'live-monitoring', label: 'Live Monitoring', path: ROUTES.liveMonitoring, icon: MonitorPlay },
  { id: 'video-surveillance', label: 'Video Surveillance', path: ROUTES.videoSurveillance, icon: Video },
  { id: 'access-control', label: 'Access Control', path: ROUTES.accessControl, icon: DoorOpen },
  { id: 'building-intercom', label: 'Building Intercom', path: ROUTES.buildingIntercom, icon: PhoneCall },
  { id: 'fire-emergency', label: 'Fire & Emergency', path: ROUTES.fireEmergency, icon: FlameKindling },
  { id: 'smart-parking', label: 'Smart Parking', path: ROUTES.smartParking, icon: ParkingSquare },
  { id: 'environment-monitoring', label: 'Environment Monitoring', path: ROUTES.environmentMonitoring, icon: Thermometer },
  { id: 'event-center', label: 'Event Center', path: ROUTES.eventCenter, icon: ListTree },
  { id: 'device-management', label: 'Device Management', path: ROUTES.deviceManagement, icon: HardDrive },
  { id: 'ai-analytics', label: 'AI Analytics', path: ROUTES.aiAnalytics, icon: BrainCircuit },
  { id: 'reports', label: 'Reports', path: ROUTES.reports, icon: FileBarChart },
  { id: 'user-management', label: 'User Management', path: ROUTES.users, icon: Users },
  { id: 'settings', label: 'Settings', path: ROUTES.settings, icon: Settings },
];
