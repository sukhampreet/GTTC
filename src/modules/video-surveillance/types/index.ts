import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

/** Core camera inventory record used across Live View, Camera List and Home. */
export interface CameraRecord {
  id: string;
  name: string;
  ipAddress: string;
  status: DeviceOnlineStatus;
  recording: boolean;
  aiEnabled: boolean;
  resolution: '4K' | '1080p' | '720p';
  location: string;
  building: string;
  floor: string;
  firmware: string;
  lastSeen: string;
  health: StatusTone;
  nvr: string;
  streamQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  group: string;
  hasPtz: boolean;
  /**
   * Present only for the real, backend-integrated CP PLUS camera (Stage 2).
   * When set, Live View renders `LiveCameraPlayer` for this tile instead of
   * the static placeholder, using this id against the FastAPI backend.
   * Absent/undefined for every mock camera — do not set this on mock data.
   */
  liveCameraId?: string;
}

export type HealthState = 'healthy' | 'warning' | 'critical' | 'offline';

/** Per-camera health telemetry (Camera Health page). */
export interface CameraHealthRecord {
  id: string;
  cameraId: string;
  cameraName: string;
  state: HealthState;
  cpuPct: number;
  memoryPct: number;
  bitrateMbps: number;
  bandwidthMbps: number;
  storageHealthPct: number;
  uptimeDays: number;
}

export interface AvailabilityTrendPoint {
  label: string;
  online: number;
  offline: number;
}

export interface HealthDistributionSlice {
  name: string;
  value: number;
  tone: StatusTone;
}

/** NVR inventory (Home overview). */
export interface NvrRecord {
  id: string;
  name: string;
  location: string;
  status: DeviceOnlineStatus;
  linkedCameras: number;
  storageUsedPct: number;
  raidStatus: 'healthy' | 'degraded' | 'rebuilding';
}

export interface EdgeDeviceRecord {
  id: string;
  name: string;
  location: string;
  status: DeviceOnlineStatus;
  linkedCameras: number;
  inferenceLoadPct: number;
  model: string;
}

export interface CameraGroup {
  id: string;
  name: string;
  cameraCount: number;
  onlineCount: number;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  tone: StatusTone;
  timestamp: string;
  camera?: string;
}

export interface RecentEvent {
  id: string;
  time: string;
  camera: string;
  event: string;
  type: 'motion' | 'ai' | 'system' | 'user';
  tone: StatusTone;
}

/** Playback / recording archive entry. */
export interface RecordingEntry {
  id: string;
  camera: string;
  building: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMin: number;
  type: 'continuous' | 'motion' | 'ai-event' | 'manual';
  sizeGb: number;
  locked: boolean;
}

export interface RecordingPolicy {
  id: string;
  name: string;
  scope: string;
  mode: 'continuous' | 'motion-only' | 'ai-triggered' | 'scheduled';
  retentionDays: number;
  status: 'active' | 'inactive';
}

export interface StorageSummary {
  id: string;
  label: string;
  usedPct: number;
  used: string;
  total: string;
  tone: StatusTone;
}

export interface SnapshotRecord {
  id: string;
  camera: string;
  building: string;
  capturedAt: string;
  trigger: 'manual' | 'motion' | 'ai-detection' | 'scheduled';
  resolution: string;
}

export interface PtzPreset {
  id: string;
  name: string;
  camera: string;
}

export interface PtzPatrol {
  id: string;
  name: string;
  camera: string;
  presetCount: number;
  intervalSec: number;
  active: boolean;
}

export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface ScheduleBlock {
  day: WeekDay;
  startHour: number;
  endHour: number;
  mode: 'continuous' | 'motion' | 'ai-triggered' | 'off';
}

export interface ScheduleProfile {
  id: string;
  name: string;
  appliedCameras: number;
  blocks: ScheduleBlock[];
}

/** Matches the CP PLUS NVR's actual top-level on-screen menu structure. */
export type CameraConfigTab =
  | 'camera'
  | 'network'
  | 'event'
  | 'storage'
  | 'display'
  | 'account'
  | 'system'
  | 'info'
  | 'security';

export interface AnalyticsSummary {
  id: string;
  label: string;
  value: string | number;
  tone: StatusTone;
  hint?: string;
}

export interface DetectionTrendPoint {
  label: string;
  detections: number;
  falseAlarms: number;
}

export interface DetectionTypeSlice {
  name: string;
  value: number;
  tone: StatusTone;
}

/** AI detection event feed shared by the AI Detection hub and its 10 subpages. */
export interface DetectionEvent {
  id: string;
  time: string;
  camera: string;
  location: string;
  category: DetectionCategory;
  confidencePct: number;
  status: 'new' | 'acknowledged' | 'dismissed';
  tone: StatusTone;
}

export type DetectionCategory =
  | 'person'
  | 'vehicle'
  | 'face'
  | 'weapon'
  | 'fire'
  | 'intrusion'
  | 'crowd'
  | 'helmet'
  | 'ppe'
  | 'line-crossing';

export interface DetectionCategoryMeta {
  category: DetectionCategory;
  label: string;
  description: string;
  camerasEnabled: number;
  detectionsToday: number;
  accuracyPct: number;
  tone: StatusTone;
}
