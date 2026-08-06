import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  loginAt: string | null;
  lastActivityAt: string | null;
  startSession: () => void;
  touchActivity: () => void;
  endSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      loginAt: null,
      lastActivityAt: null,

      startSession: () => {
        const now = new Date().toISOString();
        set({ loginAt: now, lastActivityAt: now });
      },

      touchActivity: () => set({ lastActivityAt: new Date().toISOString() }),

      endSession: () => set({ loginAt: null, lastActivityAt: null }),
    }),
    {
      name: 'gttc-user-session',
    },
  ),
);
