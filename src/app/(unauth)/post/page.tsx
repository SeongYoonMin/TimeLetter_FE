import PostLetterContainer from "@/components/post/PostLetterContainer";
import PostLetterProvider from "@/providers/PostLetterProvider";
import React, { Suspense } from "react";

const Page = () => {
  // ?userid=26wm3Z5fPu2aIIIo2AzkzQ%3D%3D&nickname=%EC%9C%A0%EB%8B%88%EB%AA%A8%EC%B0%8C&background=%2Fimg%2Fpond.png&capsule=heart
  return (
    <section className="w-full bg-[#F7F7F7]">
      <PostLetterProvider>
        <Suspense fallback={<div></div>}>
          <PostLetterContainer />
        </Suspense>
      </PostLetterProvider>
    </section>
  );
};

export default Page;
