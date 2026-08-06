import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthUser, LoginCredentials, UserRole } from '@/types/auth';
import { useSessionStore } from '@/store/sessionStore';

const MOCK_ADMIN_USER: AuthUser = {
  id: 'USR-001',
  username: 'admin',
  fullName: 'System Administrator',
  email: 'admin@gttc-security.local',
  role: 'Administrator',
  avatarInitials: 'SA',
  permissions: [
    'dashboard:view',
    'video:view',
    'access:view',
    'intercom:view',
    'fire:view',
    'parking:view',
    'environment:view',
    'events:view',
    'devices:view',
    'ai:view',
    'reports:view',
    'users:manage',
    'settings:manage',
  ],
};

interface AuthState {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  role: UserRole | null;
  permissions: string[];
  login: (credentials: LoginCredentials) => { success: boolean; error?: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      currentUser: null,
      role: null,
      permissions: [],

      login: ({ username, password }) => {
        const isValid = username.trim().toLowerCase() === 'admin' && password === 'admin123';

        if (!isValid) {
          return { success: false, error: 'Invalid username or password' };
        }

        set({
          isAuthenticated: true,
          currentUser: MOCK_ADMIN_USER,
          role: MOCK_ADMIN_USER.role,
          permissions: MOCK_ADMIN_USER.permissions,
        });

        useSessionStore.getState().startSession();

        return { success: true };
      },

      logout: () => {
        set({ isAuthenticated: false, currentUser: null, role: null, permissions: [] });
        useSessionStore.getState().endSession();
      },
    }),
    {
      name: 'gttc-auth-session',
    },
  ),
);
