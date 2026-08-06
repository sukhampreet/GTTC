export const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  liveMonitoring: '/live-monitoring',
  videoSurveillance: '/video-surveillance',
  accessControl: '/access-control',
  buildingIntercom: '/building-intercom',
  fireEmergency: '/fire-emergency',
  smartParking: '/smart-parking',
  environmentMonitoring: '/environment-monitoring',
  eventCenter: '/event-center',
  deviceManagement: '/device-management',
  aiAnalytics: '/ai-analytics',
  reports: '/reports',
  users: '/users',
  settings: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
