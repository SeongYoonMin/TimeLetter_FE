"use client";

import React, { useEffect, useMemo } from "react";
import PostLetterMain from "../post/PostLetterMain";
import { usePostLetterStore } from "@/providers/PostLetterProvider";
import { useSearchParams } from "next/navigation";

const PostLetterContainer = () => {
  const postLetterStore = usePostLetterStore((store) => store);
  const searchParams = useSearchParams();
  const { userid, nickname, background, capsule } = useMemo(() => {
    return {
      userid: searchParams.get("userid") as string,
      nickname: searchParams.get("nickname") as string,
      background: searchParams.get("background") as string,
      capsule: searchParams.get("capsule") as string,
    };
  }, [searchParams]);
  useEffect(() => {
    if (userid && userid !== postLetterStore.userId) {
      postLetterStore.setUserId(userid);
    }
    if (nickname && nickname !== postLetterStore.nickname) {
      postLetterStore.setNickname(nickname);
    }
    if (background && background !== postLetterStore.background) {
      postLetterStore.setBackground(decodeURIComponent(background));
    }
    if (capsule && capsule !== postLetterStore.capsule) {
      postLetterStore.setCapsule(capsule);
    }
  }, [background, capsule, nickname, postLetterStore, userid]);

  return (
    <div className="w-full h-screen bg-white">
      <PostLetterMain />
    </div>
  );
};

export default PostLetterContainer;
