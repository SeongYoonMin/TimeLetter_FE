import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IPostLetterProps {
  userId: string;
  nickname: string;
  firstView: string[];
  lastView: string[];
  favoriteView: string;
  postContent: string;
  postLastContent: string;
  background: string;
  capsule: string;
}

interface IPostLetterActions {
  initPostLetter: () => void;
  setUserId: (userId: string) => void;
  setNickname: (nickname: string) => void;
  setFirstView: (getFirstView: string) => void;
  setLastView: (lastView: string) => void;
  setFavoriteView: (favoriteView: string) => void;
  setPostContent: (postContent: string) => void;
  setPostLastContent: (postLastContent: string) => void;
  setBackground: (background: string) => void;
  setCapsule: (capsule: string) => void;
}

export type PostViewStore = IPostLetterProps & IPostLetterActions;

export const createPostLetterStore = (initialState?: IPostLetterProps) => {
  const DEFAULT_STATE: IPostLetterProps = {
    userId: "",
    nickname: "",
    firstView: [],
    lastView: [],
    favoriteView: "",
    postContent: "",
    postLastContent: "",
    background: "",
    capsule: "",
  };
  return createStore<PostViewStore>()(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        ...initialState,
        initPostLetter: () => set({ ...DEFAULT_STATE }),
        setUserId: (userId: string) => set({ userId }),
        setNickname: (nickname: string) => set({ nickname }),
        setFirstView: (getFirstView: string) =>
          set((state) => {
            if (state.firstView.includes(getFirstView)) {
              return {
                firstView: state.firstView.filter((b) => b !== getFirstView),
              };
            } else if (state.firstView.length < 3) {
              return { firstView: [...state.firstView, getFirstView] };
            }
            return state;
          }),
        setLastView: (getLastView: string) =>
          set((state) => {
            if (state.lastView.includes(getLastView)) {
              return {
                lastView: state.lastView.filter((b) => b !== getLastView),
              };
            } else if (state.lastView.length < 3) {
              return { lastView: [...state.lastView, getLastView] };
            }
            return state;
          }),
        setFavoriteView: (favoriteView: string) =>
          set((state) => {
            if (state.favoriteView === favoriteView) {
              return { favoriteView: "" };
            }
            return { favoriteView };
          }),
        setPostContent: (postContent: string) => set({ postContent }),
        setPostLastContent: (postLastContent: string) =>
          set({ postLastContent }),
        setBackground: (background: string) => set({ background }),
        setCapsule: (capsule: string) => set({ capsule }),
      }),
      { name: "post-letter", storage: createJSONStorage(() => sessionStorage) }
    )
  );
};
