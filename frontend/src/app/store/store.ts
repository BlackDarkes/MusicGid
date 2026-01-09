
import { burgerSlice, IBurgerSlice } from "@/features/burger";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TypeStore = IBurgerSlice;

export const useStore = create<TypeStore>()(
  devtools(
    (set, get, api) => ({
      ...burgerSlice(set, get, api)
    })
  )
)