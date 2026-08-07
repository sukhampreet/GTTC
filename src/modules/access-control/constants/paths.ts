/**
 * Route segments relative to ROUTES.accessControl ('/access-control').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 4.
 */
export const ACCESS_CONTROL_PATHS = {
  home: '',
  doorStatus: 'live-door-status',
  logs: 'access-logs',
  faces: 'face-management',
  cards: 'card-management',
  visitors: 'visitor-management',
  employees: 'employee-management',
  doorControl: 'door-control',
  attendance: 'attendance',
  schedule: 'time-schedule',
  permissions: 'access-permissions',
  antiPassback: 'anti-passback',
  blacklist: 'blacklist',
  emergency: 'emergency-unlock',
  devices: 'device-configuration',
} as const;
