import { create } from 'zustand';

interface SelectedModuleState {
  activeModuleId: string | null;
  setActiveModuleId: (id: string | null) => void;
}

export const useSelectedModuleStore = create<SelectedModuleState>()((set) => ({
  activeModuleId: null,
  setActiveModuleId: (id) => set({ activeModuleId: id }),
}));
