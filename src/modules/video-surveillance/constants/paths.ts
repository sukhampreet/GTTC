/**
 * Route segments relative to ROUTES.videoSurveillance ('/video-surveillance').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 3.
 */
export const VIDEO_SURVEILLANCE_PATHS = {
  home: '',
  liveView: 'live-view',
  playback: 'playback',
  cameraList: 'camera-list',
  cameraHealth: 'camera-health',
  recording: 'recording',
  snapshots: 'snapshots',
  ptz: 'ptz-control',
  schedule: 'recording-schedule',
  configuration: 'camera-configuration',
  analytics: 'video-analytics',
  aiDetection: 'ai-detection',
} as const;

/** AI Detection is a sub-module with its own overview + 10 detection-type subpages. */
export const AI_DETECTION_PATHS = {
  overview: '',
  person: 'person-detection',
  vehicle: 'vehicle-detection',
  face: 'face-detection',
  weapon: 'weapon-detection',
  fire: 'fire-detection',
  intrusion: 'intrusion-detection',
  crowd: 'crowd-detection',
  helmet: 'helmet-detection',
  ppe: 'ppe-detection',
  lineCrossing: 'line-crossing',
} as const;
