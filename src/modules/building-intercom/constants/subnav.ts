import {
  LayoutGrid,
  DoorOpen,
  Building2,
  PhoneCall,
  History,
  KeyRound,
  Megaphone,
  HeartPulse,
  Video,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';

import { BUILDING_INTERCOM_PATHS } from '@/modules/building-intercom/constants/paths';

export interface BuildingIntercomNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const BUILDING_INTERCOM_SUBNAV: BuildingIntercomNavItem[] = [
  { id: 'home', label: 'Overview', path: BUILDING_INTERCOM_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'indoor-stations', label: 'Indoor Stations', path: BUILDING_INTERCOM_PATHS.indoorStations, icon: Building2 },
  { id: 'outdoor-stations', label: 'Outdoor Stations', path: BUILDING_INTERCOM_PATHS.outdoorStations, icon: DoorOpen },
  { id: 'live-calls', label: 'Live Calls', path: BUILDING_INTERCOM_PATHS.liveCalls, icon: PhoneCall },
  { id: 'call-history', label: 'Call History', path: BUILDING_INTERCOM_PATHS.callHistory, icon: History },
  { id: 'remote-unlock', label: 'Remote Unlock', path: BUILDING_INTERCOM_PATHS.remoteUnlock, icon: KeyRound },
  { id: 'voice-broadcast', label: 'Voice Broadcast', path: BUILDING_INTERCOM_PATHS.voiceBroadcast, icon: Megaphone },
  { id: 'device-status', label: 'Device Status', path: BUILDING_INTERCOM_PATHS.deviceStatus, icon: HeartPulse },
  { id: 'recording', label: 'Recording', path: BUILDING_INTERCOM_PATHS.recording, icon: Video },
  { id: 'configuration', label: 'Configuration', path: BUILDING_INTERCOM_PATHS.configuration, icon: SlidersHorizontal },
];
