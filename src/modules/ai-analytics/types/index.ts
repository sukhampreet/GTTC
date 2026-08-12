import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

export type MatchStatus = 'matched' | 'unmatched' | 'watchlist';

export interface FaceRecognitionEvent {
  id: string;
  timestamp: string;
  person: string;
  camera: string;
  location: string;
  confidence: number;
  matchStatus: MatchStatus;
  status: 'processed' | 'reviewing' | 'flagged';
}

export interface PersonDetectionEvent {
  id: string;
  timestamp: string;
  camera: string;
  location: string;
  count: number;
  confidence: number;
  status: 'normal' | 'review' | 'alert';
}

export type VehicleType = 'car' | 'truck' | 'motorcycle' | 'bus';

export interface VehicleDetectionEvent {
  id: string;
  timestamp: string;
  vehicleType: VehicleType;
  camera: string;
  location: string;
  confidence: number;
  status: 'normal' | 'review' | 'alert';
}

export type IntrusionSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface IntrusionEvent {
  id: string;
  timestamp: string;
  camera: string;
  zone: string;
  detection: string;
  severity: IntrusionSeverity;
  status: 'active' | 'investigating' | 'resolved';
}

export interface LineCrossingEvent {
  id: string;
  time: string;
  camera: string;
  line: string;
  direction: 'inbound' | 'outbound';
  confidence: number;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface CrowdZone {
  id: string;
  zone: string;
  location: string;
  currentCount: number;
  threshold: number;
  density: 'low' | 'moderate' | 'high' | 'critical';
  peakToday: number;
  camera: string;
}

export type PpeViolationType = 'helmet' | 'vest' | 'gloves' | 'mask' | 'goggles';

export interface PPEDetectionEvent {
  id: string;
  timestamp: string;
  camera: string;
  location: string;
  violation: PpeViolationType;
  confidence: number;
  status: 'open' | 'acknowledged' | 'resolved';
}

export type BehaviorType = 'loitering' | 'fighting' | 'fall-detection' | 'running' | 'abandoned-object' | 'trespassing';

export interface BehaviorEvent {
  id: string;
  timestamp: string;
  camera: string;
  location: string;
  behaviorType: BehaviorType;
  confidence: number;
  severity: IntrusionSeverity;
  status: 'open' | 'reviewing' | 'resolved';
}

export interface HeatMapZone {
  id: string;
  zone: string;
  camera: string;
  activityDensity: number;
  crowdDensity: number;
  intrusionRisk: 'low' | 'moderate' | 'high';
  movementIndex: number;
}

export type AIAlertType =
  | 'Intrusion Detected'
  | 'Unknown Face'
  | 'Crowd Threshold Exceeded'
  | 'PPE Violation'
  | 'Suspicious Behavior'
  | 'Vehicle Detection'
  | 'Line Crossing';

export interface AIAlert {
  id: string;
  timestamp: string;
  alertType: AIAlertType;
  camera: string;
  location: string;
  severity: IntrusionSeverity;
  confidence: number;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface AIModel {
  id: string;
  modelName: string;
  modelType: string;
  version: string;
  status: 'running' | 'stopped' | 'updating' | 'error';
  accuracy: number;
  lastUpdated: string;
  deploymentStatus: 'deployed' | 'staged' | 'not-deployed';
  enabled: boolean;
}

export interface DetectionTrendPoint {
  day: string;
  detections: number;
  alerts: number;
}

export interface DetectionDistributionSlice {
  category: string;
  value: number;
  color: string;
}

export interface AiActivityEntry {
  id: string;
  time: string;
  description: string;
  tone: StatusTone;
}

export interface CameraAiStatus {
  id: string;
  camera: string;
  status: DeviceOnlineStatus;
  processing: boolean;
}
