/**
 * Route segments relative to ROUTES.deviceManagement ('/device-management').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 10.
 */
export const DEVICE_MANAGEMENT_PATHS = {
  home: '',
  inventory: 'device-inventory',
  details: 'device-details',
  health: 'device-health',
  groups: 'device-groups',
  diagnostics: 'diagnostics',
  firmware: 'firmware',
  maintenance: 'maintenance',
  network: 'network-devices',
  events: 'device-events',
} as const;
