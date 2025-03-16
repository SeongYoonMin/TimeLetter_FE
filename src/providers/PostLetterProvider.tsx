"use client";

import { createPostLetterStore, PostViewStore } from "@/stores/PostLetter";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export type PostLetterStoreApi = ReturnType<typeof createPostLetterStore>;

export const PostLetterContext = createContext<PostLetterStoreApi | null>(null);

export const usePostLetterStore = <T,>(
  selector: (store: PostViewStore) => T
): T => {
  const postLetterStore = useContext(PostLetterContext);
  if (!postLetterStore) {
    throw new Error(
      "PostViewStore RegisterProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return useStore(postLetterStore, selector);
};

const PostLetterProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<PostLetterStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createPostLetterStore();
  }
  return (
    <PostLetterContext.Provider value={storeRef.current}>
      {children}
    </PostLetterContext.Provider>
  );
};

export default PostLetterProvider;
