"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";

const LetterShareButton = () => {
  const handleShare = () => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: "text",
      text: `테스트입니다.`,
      link: {
        mobileWebUrl: `http://localhost:4862/`,
        webUrl: `http://localhost:4862/`,
      },
    });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;
      if (!Kakao) return;
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
    }
  }, []);
  return (
    <Button variant={"secondary"} onClick={handleShare}>
      친구에게 공유하고 편지 받기
    </Button>
  );
};

export default LetterShareButton;
