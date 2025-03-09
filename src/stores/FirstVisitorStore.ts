import { createStore } from "zustand";
import { persist } from "zustand/middleware";

interface IFirstVisitorProps {
  firstVisitor: boolean;
}

interface IFirstVisitorActions {
  initFirstVisitor: (firstVisitor: boolean) => void;
  setFirstVisitor: (firstVisitor: boolean) => void;
}

export type FirstVisitorStore = IFirstVisitorProps & IFirstVisitorActions;

export const createFirstVisitorStore = (initialState?: IFirstVisitorProps) => {
  const DEFAULT_STATE: IFirstVisitorProps = {
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
