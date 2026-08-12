import {
  LayoutGrid,
  ScanFace,
  UserRound,
  Car,
  ShieldAlert,
  MoveHorizontal,
  Users,
  HardHat,
  Activity,
  Flame,
  BellRing,
  FileBarChart,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

import { AI_ANALYTICS_PATHS } from '@/modules/ai-analytics/constants/paths';

export interface AiAnalyticsNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const AI_ANALYTICS_SUBNAV: AiAnalyticsNavItem[] = [
  { id: 'home', label: 'AI Analytics Home', path: AI_ANALYTICS_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'face-recognition', label: 'Face Recognition', path: AI_ANALYTICS_PATHS.faceRecognition, icon: ScanFace },
  { id: 'person-detection', label: 'Person Detection', path: AI_ANALYTICS_PATHS.personDetection, icon: UserRound },
  { id: 'vehicle-detection', label: 'Vehicle Detection', path: AI_ANALYTICS_PATHS.vehicleDetection, icon: Car },
  { id: 'intrusion-detection', label: 'Intrusion Detection', path: AI_ANALYTICS_PATHS.intrusionDetection, icon: ShieldAlert },
  { id: 'line-crossing', label: 'Line Crossing', path: AI_ANALYTICS_PATHS.lineCrossing, icon: MoveHorizontal },
  { id: 'crowd-detection', label: 'Crowd Detection', path: AI_ANALYTICS_PATHS.crowdDetection, icon: Users },
  { id: 'ppe-detection', label: 'PPE Detection', path: AI_ANALYTICS_PATHS.ppeDetection, icon: HardHat },
  { id: 'behavior-analysis', label: 'Behavior Analysis', path: AI_ANALYTICS_PATHS.behaviorAnalysis, icon: Activity },
  { id: 'heat-maps', label: 'Heat Maps', path: AI_ANALYTICS_PATHS.heatMaps, icon: Flame },
  { id: 'ai-alerts', label: 'AI Alerts', path: AI_ANALYTICS_PATHS.alerts, icon: BellRing },
  { id: 'ai-reports', label: 'AI Reports', path: AI_ANALYTICS_PATHS.reports, icon: FileBarChart },
  { id: 'ai-model-manager', label: 'AI Model Manager', path: AI_ANALYTICS_PATHS.modelManager, icon: Cpu },
];
