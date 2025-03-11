import { createStore } from "zustand";

interface IRegisterProps {
  background: string;
  capsule: string;
  nickname: string;
}

interface IRegisterActions {
  initRegister: () => void;
  setBackground: (background: string) => void;
  setCapsule: (capsule: string) => void;
  setNickname: (nickname: string) => void;
}

export type RegisterStore = IRegisterProps & IRegisterActions;

export const createRegisterStore = (initialState?: IRegisterProps) => {
  const DEFAULT_STATE: IRegisterProps = {
    background: "/img/pond.png",
    capsule: "/img/circle.png",
    nickname: "",
  };
  return createStore<RegisterStore>((set) => ({
    ...DEFAULT_STATE,
    ...initialState,
    initRegister: () => set({ ...DEFAULT_STATE }),
    setBackground: (getBackground: string) =>
      set({ background: getBackground }),
    setCapsule: (getCapsule: string) => set({ capsule: getCapsule }),
    setNickname: (getNickname: string) => set({ nickname: getNickname }),
  }));
};
