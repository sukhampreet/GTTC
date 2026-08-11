/**
 * Route segments relative to ROUTES.environmentMonitoring ('/environment-monitoring').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 8.
 */
export const ENVIRONMENT_MONITORING_PATHS = {
  home: '',
  temperature: 'temperature',
  humidity: 'humidity',
  airQuality: 'air-quality',
  occupancy: 'occupancy',
  energyUsage: 'energy-usage',
  lighting: 'lighting',
  hvac: 'hvac',
  alerts: 'alerts',
  historicalGraphs: 'historical-graphs',
  deviceStatus: 'device-status',
} as const;
