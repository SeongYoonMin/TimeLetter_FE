import { createStore } from "zustand";
import { persist } from "zustand/middleware";

interface FirstVisitorProps {
  firstVisitor: boolean;
}

interface FirstVisitorActions {
  initFirstVisitor: (firstVisitor: boolean) => void;
  setFirstVisitor: (firstVisitor: boolean) => void;
}

export type FirstVisitorStore = FirstVisitorProps & FirstVisitorActions;

export const createFirstVisitorStore = (initialState?: FirstVisitorProps) => {
  const DEFAULT_STATE: FirstVisitorProps = {
    firstVisitor: true,
  };
  return createStore<FirstVisitorStore>()(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        ...initialState,
        initFirstVisitor: (firstVisitor: boolean) => set({ firstVisitor }),
        setFirstVisitor: (firstVisitor: boolean) =>
          set({ firstVisitor: !firstVisitor }),
      }),
      { name: "first-visitor" }
    )
  );
};
