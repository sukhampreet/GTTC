import type { UserRole } from '@/types/auth';
import type { StatusTone } from '@/types/common';

export type AccountStatus = 'active' | 'disabled' | 'locked' | 'pending';

/** Enterprise user record — richer than the shared PlatformUserRecord used for auth mock data. */
export interface ManagedUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: UserRole;
  status: AccountStatus;
  lastLogin: string;
  createdDate: string;
  accessGroup: string;
  mfaEnabled: boolean;
  failedLoginAttempts: number;
  lastPasswordChange: string;
}

export interface RoleRecord {
  id: string;
  name: UserRole;
  description: string;
  usersAssigned: number;
  permissionCount: number;
  status: 'active' | 'inactive';
  isSystemRole: boolean;
}

export type PermissionLevel = 'none' | 'view' | 'manage' | 'configure' | 'administrate';

/** module id -> permission key -> granted */
export type PermissionMatrixState = Record<string, Record<string, boolean>>;

export interface AccessGroupRecord {
  id: string;
  name: string;
  description: string;
  assignedUsers: number;
  assignedModules: string[];
  status: 'active' | 'inactive';
}

export interface SessionRecord {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  device: string;
  ipAddress: string;
  loginTime: string;
  lastActivity: string;
  status: 'active' | 'idle' | 'expired';
}

export interface UserActivityRecord {
  id: string;
  user: string;
  timestamp: string;
  action: string;
  module: string;
  ipAddress: string;
  result: 'success' | 'failed';
  device: string;
}

export interface RecentAdminEvent {
  id: string;
  event: string;
  tone: StatusTone;
  timestamp: string;
}
