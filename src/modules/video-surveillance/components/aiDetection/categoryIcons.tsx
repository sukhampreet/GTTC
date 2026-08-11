import {
  Flame,
  HardHat,
  PersonStanding,
  ScanFace,
  Shield,
  ShieldAlert,
  SquareStack,
  Users,
  Car,
  MoveHorizontal,
  type LucideIcon,
} from 'lucide-react';

import type { DetectionCategory } from '@/modules/video-surveillance/types';

export const DETECTION_CATEGORY_ICON: Record<DetectionCategory, LucideIcon> = {
  person: PersonStanding,
  vehicle: Car,
  face: ScanFace,
  weapon: ShieldAlert,
  fire: Flame,
  intrusion: Shield,
  crowd: Users,
  helmet: HardHat,
  ppe: SquareStack,
  'line-crossing': MoveHorizontal,
};
