export type UserRole = 'Administrator' | 'Operator' | 'Supervisor' | 'Security Officer';

export type Permission =
  | 'dashboard:view'
  | 'video:view'
  | 'access:view'
  | 'intercom:view'
  | 'fire:view'
  | 'parking:view'
  | 'environment:view'
  | 'events:view'
  | 'devices:view'
  | 'ai:view'
  | 'reports:view'
  | 'users:manage'
  | 'settings:manage';

export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarInitials: string;
  permissions: Permission[];
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}
