/**
 * Route segments relative to ROUTES.reports ('/reports').
 * Kept local to the module so the global ROUTES/navigation config does not
 * need to change for this sprint. Mirrors the Fire & Emergency module pattern.
 */
export const REPORTS_PATHS = {
  home: '',
  daily: 'daily-reports',
  weekly: 'weekly-reports',
  monthly: 'monthly-reports',
  incident: 'incident-reports',
  attendance: 'attendance-reports',
  parking: 'parking-reports',
  fire: 'fire-reports',
  access: 'access-reports',
  ai: 'ai-reports',
  event: 'event-reports',
  device: 'device-reports',
  details: 'report-details',
  export: 'report-export',
} as const;
