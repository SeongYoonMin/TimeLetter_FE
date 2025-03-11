"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  type RegisterStore,
  createRegisterStore,
} from "@/stores/RegisterStore";

export type RegisterStoreApi = ReturnType<typeof createRegisterStore>;

export const RegisterContext = createContext<RegisterStoreApi | null>(null);

export const useRegisterStore = <T,>(
  selector: (store: RegisterStore) => T
): T => {
  const registerStore = useContext(RegisterContext);
  if (!registerStore) {
    throw new Error(
      "registerStore는 RegisterProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return useStore(registerStore, selector);
};

const RegisterStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<RegisterStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createRegisterStore();
  }
  return (
    <RegisterContext.Provider value={storeRef.current}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterStoreProvider;
