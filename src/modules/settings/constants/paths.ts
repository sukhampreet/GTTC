/**
 * Route segments relative to ROUTES.settings ('/settings').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 14.
 */
export const SETTINGS_PATHS = {
  overview: '',
  general: 'general',
  appearance: 'appearance',
  network: 'network',
  notifications: 'notifications',
  email: 'email',
  sms: 'sms',
  backup: 'backup',
  restore: 'restore',
  database: 'database',
  services: 'services',
  logs: 'logs',
  audit: 'audit',
} as const;
