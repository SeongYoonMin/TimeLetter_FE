import { createStore } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthProps {
  id: number;
  nick_name: string;
  user_id: string;
  background: string;
  ribbon: string;
}

interface IAuthActions {
  initAuthorization: () => void;
  setAuthorization: (userData: IAuthProps) => void;
}

export type AuthStore = IAuthProps & IAuthActions;

export const createAuthStore = (initialState?: IAuthProps) => {
  const DEFAULT_STATE: IAuthProps = {
    id: 0,
    nick_name: "",
    user_id: "",
    background: "",
    ribbon: "",
  };
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        ...initialState,
        initAuthorization: () => set({ ...DEFAULT_STATE }),
        setAuthorization: (userData: IAuthProps) => set({ ...userData }),
      }),
      { name: "login-user" }
    )
  );
};
