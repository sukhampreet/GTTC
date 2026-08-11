/**
 * Route segments relative to ROUTES.fireEmergency ('/fire-emergency').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 7.
 */
export const FIRE_EMERGENCY_PATHS = {
  home: '',
  smoke: 'smoke-detection',
  heat: 'heat-detection',
  mcp: 'manual-call-point',
  alarmHistory: 'alarm-history',
  broadcast: 'emergency-broadcast',
  pa: 'pa-system',
  zones: 'zone-monitoring',
  deviceHealth: 'device-health',
  alarmReset: 'alarm-reset',
  faults: 'fault-monitoring',
  eventLogs: 'event-logs',
  emergencyResponse: 'emergency-response',
} as const;
