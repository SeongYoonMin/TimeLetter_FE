"use client";

import { usePostLetterStore } from "@/providers/PostLetterProvider";
import React from "react";

const StepLast = () => {
  const postLetterStore = usePostLetterStore((store) => store);
  return (
    <div>
      <p>{postLetterStore.userId}</p>
      <p>{postLetterStore.nickname}</p>
      <p>{postLetterStore.background}</p>
      <p>{postLetterStore.capsule}</p>
      <p>{JSON.stringify(postLetterStore.firstView)}</p>
      <p>{JSON.stringify(postLetterStore.lastView)}</p>
      <p>{postLetterStore.favoriteView}</p>
      <p>{postLetterStore.postContent}</p>
      <p>{postLetterStore.postLastContent}</p>
    </div>
  );
};

export default StepLast;
