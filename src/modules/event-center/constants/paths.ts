/**
 * Route segments relative to ROUTES.eventCenter ('/event-center').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 9.
 */
export const EVENT_CENTER_PATHS = {
  home: '',
  critical: 'critical-events',
  warnings: 'warnings',
  information: 'information',
  timeline: 'event-timeline',
  search: 'event-search',
  details: 'event-details',
  replay: 'event-replay',
  export: 'event-export',
  statistics: 'event-statistics',
} as const;
