/**
 * Route segments relative to ROUTES.buildingIntercom ('/building-intercom').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 5.
 */
export const BUILDING_INTERCOM_PATHS = {
  home: '',
  indoorStations: 'indoor-stations',
  outdoorStations: 'outdoor-stations',
  liveCalls: 'live-calls',
  callHistory: 'call-history',
  remoteUnlock: 'remote-unlock',
  voiceBroadcast: 'voice-broadcast',
  deviceStatus: 'device-status',
  recording: 'recording',
  configuration: 'configuration',
} as const;
