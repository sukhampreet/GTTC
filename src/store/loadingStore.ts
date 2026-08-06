import { create } from 'zustand';

interface LoadingState {
  activeKeys: Set<string>;
  isLoading: (key?: string) => boolean;
  start: (key: string) => void;
  stop: (key: string) => void;
}

export const useLoadingStore = create<LoadingState>()((set, get) => ({
  activeKeys: new Set(),

  isLoading: (key) => {
    const { activeKeys } = get();
    return key ? activeKeys.has(key) : activeKeys.size > 0;
  },

  start: (key) =>
    set((state) => {
      const next = new Set(state.activeKeys);
      next.add(key);
      return { activeKeys: next };
    }),

  stop: (key) =>
    set((state) => {
      const next = new Set(state.activeKeys);
      next.delete(key);
      return { activeKeys: next };
    }),
}));
