import { Users, UserCircle, ShieldCheck, KeyRound, LayoutGrid, FolderLock, Radio, History, type LucideIcon } from 'lucide-react';

import { USER_MANAGEMENT_PATHS } from '@/modules/user-management/constants/paths';

export interface UserManagementNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const USER_MANAGEMENT_SUBNAV: UserManagementNavItem[] = [
  { id: 'users', label: 'Users', path: USER_MANAGEMENT_PATHS.users, icon: Users, end: true },
  { id: 'profile', label: 'User Profile', path: USER_MANAGEMENT_PATHS.profile, icon: UserCircle },
  { id: 'roles', label: 'Roles', path: USER_MANAGEMENT_PATHS.roles, icon: ShieldCheck },
  { id: 'permissions', label: 'Permissions', path: USER_MANAGEMENT_PATHS.permissions, icon: KeyRound },
  { id: 'module-access', label: 'Module Access', path: USER_MANAGEMENT_PATHS.moduleAccess, icon: LayoutGrid },
  { id: 'access-groups', label: 'Access Groups', path: USER_MANAGEMENT_PATHS.accessGroups, icon: FolderLock },
  { id: 'sessions', label: 'Session Management', path: USER_MANAGEMENT_PATHS.sessions, icon: Radio },
  { id: 'activity', label: 'User Activity', path: USER_MANAGEMENT_PATHS.activity, icon: History },
];
