import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuthProps {
  isLogin: boolean;
  uniqueId: string;
  nickName: string;
  userId: string;
  background: string;
  capsule: string;
}

interface IAuthActions {
  initAuthorization: () => void;
  setAuthorization: (userData: IAuthProps) => void;
}

export type AuthStore = IAuthProps & IAuthActions;

export const createAuthStore = (initialState?: IAuthProps) => {
  const DEFAULT_STATE: IAuthProps = {
    isLogin: false,
    uniqueId: "",
    nickName: "",
    userId: "",
    background: "",
    capsule: "",
  };
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        ...initialState,
        initAuthorization: () => set({ ...DEFAULT_STATE }),
        setAuthorization: (userData: IAuthProps) => set({ ...userData }),
      }),
      {
        name: "login-user",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
