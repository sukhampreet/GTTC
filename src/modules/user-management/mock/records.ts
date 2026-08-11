import type {
  AccessGroupRecord,
  RecentAdminEvent,
  RoleRecord,
  SessionRecord,
  UserActivityRecord,
} from '@/modules/user-management/types';

export const roleRecords: RoleRecord[] = [
  { id: 'ROLE-01', name: 'Administrator', description: 'Full system access including user management, settings and all platform modules.', usersAssigned: 1, permissionCount: 42, status: 'active', isSystemRole: true },
  { id: 'ROLE-02', name: 'Supervisor', description: 'Oversight access across security operations with reporting and acknowledgement rights.', usersAssigned: 2, permissionCount: 27, status: 'active', isSystemRole: true },
  { id: 'ROLE-03', name: 'Operator', description: 'Day-to-day monitoring and operational control of assigned modules.', usersAssigned: 3, permissionCount: 18, status: 'active', isSystemRole: true },
  { id: 'ROLE-04', name: 'Security Officer', description: 'Frontline access to live views, access logs and incident response tools.', usersAssigned: 3, permissionCount: 12, status: 'active', isSystemRole: true },
];

export const accessGroupRecords: AccessGroupRecord[] = [
  { id: 'GRP-01', name: 'System Administration', description: 'Platform administrators with full configuration authority.', assignedUsers: 2, assignedModules: ['dashboard', 'video-surveillance', 'access-control', 'settings'], status: 'active' },
  { id: 'GRP-02', name: 'Security Operations', description: 'Control room staff monitoring live feeds and access events.', assignedUsers: 3, assignedModules: ['dashboard', 'video-surveillance', 'access-control', 'event-center'], status: 'active' },
  { id: 'GRP-03', name: 'Security Administration', description: 'Senior security staff managing access permissions and incident response.', assignedUsers: 1, assignedModules: ['access-control', 'video-surveillance', 'reports'], status: 'active' },
  { id: 'GRP-04', name: 'Fire Response Team', description: 'Emergency responders with fire and life-safety module access.', assignedUsers: 1, assignedModules: ['fire-emergency', 'building-intercom', 'event-center'], status: 'active' },
  { id: 'GRP-05', name: 'Parking Operations', description: 'Parking facility staff managing barriers and vehicle records.', assignedUsers: 1, assignedModules: ['smart-parking', 'video-surveillance'], status: 'active' },
  { id: 'GRP-06', name: 'Facility Management', description: 'Building operations staff with access control and environment oversight.', assignedUsers: 2, assignedModules: ['access-control', 'environment-monitoring', 'device-management'], status: 'inactive' },
];

export const sessionRecords: SessionRecord[] = [
  { id: 'SES-01', username: 'admin', fullName: 'Aishwarya Rao', role: 'Administrator', device: 'Chrome · Windows 11', ipAddress: '10.10.1.14', loginTime: 'Today 08:02', lastActivity: 'Just now', status: 'active' },
  { id: 'SES-02', username: 'karthik.m', fullName: 'Karthik Menon', role: 'Operator', device: 'Chrome · Windows 10', ipAddress: '10.10.1.28', loginTime: 'Today 07:10', lastActivity: '2 min ago', status: 'active' },
  { id: 'SES-03', username: 'divya.p', fullName: 'Divya Prasad', role: 'Supervisor', device: 'Edge · Windows 11', ipAddress: '10.10.1.41', loginTime: 'Today 06:55', lastActivity: '18 min ago', status: 'idle' },
  { id: 'SES-04', username: 'sneha.i', fullName: 'Sneha Iyer', role: 'Supervisor', device: 'Safari · macOS', ipAddress: '10.10.1.52', loginTime: 'Today 08:31', lastActivity: 'Just now', status: 'active' },
  { id: 'SES-05', username: 'vikram.s', fullName: 'Vikram Shetty', role: 'Operator', device: 'Chrome · Android', ipAddress: '10.10.2.63', loginTime: 'Yesterday 21:14', lastActivity: '9 hrs ago', status: 'expired' },
  { id: 'SES-06', username: 'priya.d', fullName: 'Priya Deshmukh', role: 'Security Officer', device: 'Chrome · Windows 11', ipAddress: '10.10.1.77', loginTime: 'Today 09:02', lastActivity: '1 min ago', status: 'active' },
];

export const userActivityRecords: UserActivityRecord[] = [
  { id: 'ACT-01', user: 'admin', timestamp: '09:41:02', action: 'Updated camera configuration', module: 'Video Surveillance', ipAddress: '10.10.1.14', result: 'success', device: 'Chrome · Windows 11' },
  { id: 'ACT-02', user: 'karthik.m', timestamp: '09:38:47', action: 'Acknowledged intrusion alert', module: 'AI Detection', ipAddress: '10.10.1.28', result: 'success', device: 'Chrome · Windows 10' },
  { id: 'ACT-03', user: 'divya.p', timestamp: '09:20:15', action: 'Exported access log report', module: 'Access Control', ipAddress: '10.10.1.41', result: 'success', device: 'Edge · Windows 11' },
  { id: 'ACT-04', user: 'rahul.n', timestamp: '08:58:03', action: 'Failed login attempt', module: 'Authentication', ipAddress: '10.10.3.19', result: 'failed', device: 'Chrome · Windows 10' },
  { id: 'ACT-05', user: 'sneha.i', timestamp: '08:31:44', action: 'Triggered emergency broadcast test', module: 'Fire & Emergency', ipAddress: '10.10.1.52', result: 'success', device: 'Safari · macOS' },
  { id: 'ACT-06', user: 'vikram.s', timestamp: '07:49:12', action: 'Opened parking barrier remotely', module: 'Smart Parking', ipAddress: '10.10.2.63', result: 'success', device: 'Chrome · Android' },
  { id: 'ACT-07', user: 'priya.d', timestamp: '07:22:38', action: 'Updated door access schedule', module: 'Access Control', ipAddress: '10.10.1.77', result: 'success', device: 'Chrome · Windows 11' },
  { id: 'ACT-08', user: 'arjun.k', timestamp: 'Yesterday 23:41', action: 'Account locked after failed attempts', module: 'Authentication', ipAddress: '10.10.3.44', result: 'failed', device: 'Chrome · Windows 10' },
];

export const recentAdminEvents: RecentAdminEvent[] = [
  { id: 'EVT-01', event: 'New user "Meera Krishnan" created — pending activation', tone: 'info', timestamp: '3 min ago' },
  { id: 'EVT-02', event: 'Account "arjun.k" locked after 5 failed login attempts', tone: 'danger', timestamp: '14 hrs ago' },
  { id: 'EVT-03', event: 'Role "Supervisor" permission set updated by admin', tone: 'warning', timestamp: 'Yesterday' },
  { id: 'EVT-04', event: 'Access group "Facility Management" marked inactive', tone: 'neutral', timestamp: '2 days ago' },
  { id: 'EVT-05', event: 'Session for "vikram.s" expired due to inactivity', tone: 'neutral', timestamp: '2 days ago' },
];
