/**
 * Route segments relative to ROUTES.users ('/users').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 14.
 */
export const USER_MANAGEMENT_PATHS = {
  users: '',
  profile: 'profile',
  roles: 'roles',
  permissions: 'permissions',
  moduleAccess: 'module-access',
  accessGroups: 'access-groups',
  sessions: 'sessions',
  activity: 'activity',
} as const;
