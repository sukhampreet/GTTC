import {
  LayoutGrid,
  MonitorPlay,
  History,
  Camera,
  HeartPulse,
  Disc,
  Images,
  Move3d,
  CalendarClock,
  SlidersHorizontal,
  BarChart3,
  ScanSearch,
  type LucideIcon,
} from 'lucide-react';

import { VIDEO_SURVEILLANCE_PATHS } from '@/modules/video-surveillance/constants/paths';

export interface VideoSurveillanceNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const VIDEO_SURVEILLANCE_SUBNAV: VideoSurveillanceNavItem[] = [
  { id: 'home', label: 'Overview', path: VIDEO_SURVEILLANCE_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'live-view', label: 'Live View', path: VIDEO_SURVEILLANCE_PATHS.liveView, icon: MonitorPlay },
  { id: 'playback', label: 'Playback', path: VIDEO_SURVEILLANCE_PATHS.playback, icon: History },
  { id: 'camera-list', label: 'Camera List', path: VIDEO_SURVEILLANCE_PATHS.cameraList, icon: Camera },
  { id: 'camera-health', label: 'Camera Health', path: VIDEO_SURVEILLANCE_PATHS.cameraHealth, icon: HeartPulse },
  { id: 'recording', label: 'Recording', path: VIDEO_SURVEILLANCE_PATHS.recording, icon: Disc },
  { id: 'snapshots', label: 'Snapshots', path: VIDEO_SURVEILLANCE_PATHS.snapshots, icon: Images },
  { id: 'ptz', label: 'PTZ Control', path: VIDEO_SURVEILLANCE_PATHS.ptz, icon: Move3d },
  { id: 'schedule', label: 'Recording Schedule', path: VIDEO_SURVEILLANCE_PATHS.schedule, icon: CalendarClock },
  { id: 'configuration', label: 'Camera Configuration', path: VIDEO_SURVEILLANCE_PATHS.configuration, icon: SlidersHorizontal },
  { id: 'analytics', label: 'Video Analytics', path: VIDEO_SURVEILLANCE_PATHS.analytics, icon: BarChart3 },
  { id: 'ai-detection', label: 'AI Detection', path: VIDEO_SURVEILLANCE_PATHS.aiDetection, icon: ScanSearch },
];
