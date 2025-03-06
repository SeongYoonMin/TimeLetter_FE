"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  type FirstVisitorStore,
  createFirstVisitorStore,
} from "@/stores/FirstVisitorStore";

export type FirstVisitoreStoreApi = ReturnType<typeof createFirstVisitorStore>;

export const FirstVisitorContext = createContext<FirstVisitoreStoreApi | null>(
  null
);

export const useFirstVisitorStore = <T,>(
  selector: (store: FirstVisitorStore) => T
): T => {
  const firstVisitorStore = useContext(FirstVisitorContext);
  if (!firstVisitorStore) {
    throw new Error(
      "FirstVisitorStore는 FirstVisitorProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return useStore(firstVisitorStore, selector);
};

const FirstVisitorProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<FirstVisitoreStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createFirstVisitorStore();
  }
  return (
    <FirstVisitorContext.Provider value={storeRef.current}>
      {children}
    </FirstVisitorContext.Provider>
  );
};

export default FirstVisitorProvider;
