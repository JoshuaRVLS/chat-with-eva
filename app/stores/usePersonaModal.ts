import { create } from "zustand";

type State = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const usePersonaModal = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));
