/**
 * Route segments relative to ROUTES.liveMonitoring ('/live-monitoring').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for this sprint.
 */
export const LIVE_MONITORING_PATHS = {
  home: '',
  cameraWall: 'camera-wall',
  events: 'live-events',
  alerts: 'live-alerts',
  buildings: 'building-status',
  devices: 'device-status',
  parking: 'live-parking-status',
  access: 'live-access-status',
  fire: 'live-fire-status',
  environment: 'live-environment-status',
  campus: 'campus-overview',
} as const;
