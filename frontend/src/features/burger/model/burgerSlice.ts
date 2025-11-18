import type { StateCreator } from "zustand";

export interface IBurgerSlice {
  isOpenBurger: boolean;
  handleOpen: () => void;
}

export const burgerSlice: StateCreator<IBurgerSlice> = (set) => ({
  isOpenBurger: false,
  handleOpen: () => set((state) => ({ isOpenBurger: !state.isOpenBurger })),
})