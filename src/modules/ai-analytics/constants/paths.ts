/**
 * Route segments relative to ROUTES.aiAnalytics ('/ai-analytics').
 * Kept local to the module so the global ROUTES/navigation config does not
 * need to change for this sprint. Mirrors the Fire & Emergency module pattern.
 */
export const AI_ANALYTICS_PATHS = {
  home: '',
  faceRecognition: 'face-recognition',
  personDetection: 'person-detection',
  vehicleDetection: 'vehicle-detection',
  intrusionDetection: 'intrusion-detection',
  lineCrossing: 'line-crossing',
  crowdDetection: 'crowd-detection',
  ppeDetection: 'ppe-detection',
  behaviorAnalysis: 'behavior-analysis',
  heatMaps: 'heat-maps',
  alerts: 'ai-alerts',
  reports: 'ai-reports',
  modelManager: 'ai-model-manager',
} as const;
