/**
 * Central catalog of platform modules and their granular permission keys.
 * This is a CONFIGURATION DEFINITION consumed by the Permissions and Module
 * Access pages — it does not modify or enforce anything in the modules
 * themselves. Modules already implemented (Video Surveillance, Access
 * Control) use their real names/routes; modules not yet built are included
 * per context.md so the permission architecture is ready for them when they
 * land, without inventing any UI for them.
 */
export interface PlatformModuleDefinition {
  id: string;
  label: string;
  routePath: string;
  implemented: boolean;
  permissions: { key: string; label: string }[];
}

export const PLATFORM_MODULES: PlatformModuleDefinition[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    routePath: '/dashboard',
    implemented: true,
    permissions: [{ key: 'view', label: 'View' }],
  },
  {
    id: 'live-monitoring',
    label: 'Live Monitoring',
    routePath: '/live-monitoring',
    implemented: false,
    permissions: [
      { key: 'view', label: 'View' },
      { key: 'manage', label: 'Manage' },
    ],
  },
  {
    id: 'video-surveillance',
    label: 'Video Surveillance',
    routePath: '/video-surveillance',
    implemented: true,
    permissions: [
      { key: 'view-cameras', label: 'View Cameras' },
      { key: 'live-view', label: 'Live View' },
      { key: 'playback', label: 'Playback' },
      { key: 'recording', label: 'Recording' },
      { key: 'ptz', label: 'PTZ' },
      { key: 'configuration', label: 'Camera Configuration' },
      { key: 'ai-detection', label: 'AI Detection' },
    ],
  },
  {
    id: 'access-control',
    label: 'Access Control',
    routePath: '/access-control',
    implemented: true,
    permissions: [
      { key: 'view-doors', label: 'View Doors' },
      { key: 'access-logs', label: 'Access Logs' },
      { key: 'door-control', label: 'Door Control' },
      { key: 'emergency-unlock', label: 'Emergency Unlock' },
      { key: 'configuration', label: 'Configuration' },
    ],
  },
  {
    id: 'building-intercom',
    label: 'Building Intercom',
    routePath: '/building-intercom',
    implemented: false,
    permissions: [
      { key: 'view-stations', label: 'View Stations' },
      { key: 'live-calls', label: 'Live Calls' },
      { key: 'remote-unlock', label: 'Remote Unlock' },
      { key: 'broadcast', label: 'Broadcast' },
      { key: 'recording', label: 'Recording' },
    ],
  },
  {
    id: 'fire-emergency',
    label: 'Fire & Emergency',
    routePath: '/fire-emergency',
    implemented: false,
    permissions: [
      { key: 'view-alarms', label: 'View Alarms' },
      { key: 'acknowledge', label: 'Acknowledge' },
      { key: 'alarm-reset', label: 'Alarm Reset' },
      { key: 'emergency-broadcast', label: 'Emergency Broadcast' },
      { key: 'zone-monitoring', label: 'Zone Monitoring' },
    ],
  },
  {
    id: 'smart-parking',
    label: 'Smart Parking',
    routePath: '/smart-parking',
    implemented: false,
    permissions: [
      { key: 'view-parking', label: 'View Parking' },
      { key: 'barrier-control', label: 'Barrier Control' },
      { key: 'vehicle-management', label: 'Vehicle Management' },
      { key: 'anpr', label: 'ANPR' },
    ],
  },
  {
    id: 'environment-monitoring',
    label: 'Environment Monitoring',
    routePath: '/environment-monitoring',
    implemented: false,
    permissions: [
      { key: 'view-sensors', label: 'View Sensors' },
      { key: 'alerts', label: 'Alerts' },
      { key: 'hvac', label: 'HVAC' },
      { key: 'energy', label: 'Energy' },
    ],
  },
  {
    id: 'event-center',
    label: 'Event Center',
    routePath: '/event-center',
    implemented: false,
    permissions: [
      { key: 'view-events', label: 'View Events' },
      { key: 'acknowledge', label: 'Acknowledge' },
      { key: 'export', label: 'Export' },
    ],
  },
  {
    id: 'device-management',
    label: 'Device Management',
    routePath: '/device-management',
    implemented: false,
    permissions: [
      { key: 'view-devices', label: 'View Devices' },
      { key: 'diagnostics', label: 'Diagnostics' },
      { key: 'firmware', label: 'Firmware' },
    ],
  },
  {
    id: 'ai-analytics',
    label: 'AI Analytics',
    routePath: '/ai-analytics',
    implemented: false,
    permissions: [
      { key: 'view-analytics', label: 'View Analytics' },
      { key: 'ai-models', label: 'AI Models' },
      { key: 'reports', label: 'Reports' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    routePath: '/reports',
    implemented: false,
    permissions: [
      { key: 'view-reports', label: 'View Reports' },
      { key: 'export', label: 'Export' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    routePath: '/settings',
    implemented: true,
    permissions: [
      { key: 'system-configuration', label: 'System Configuration' },
      { key: 'user-management', label: 'User Management' },
      { key: 'backup', label: 'Backup' },
      { key: 'restore', label: 'Restore' },
      { key: 'logs', label: 'Logs' },
    ],
  },
];
