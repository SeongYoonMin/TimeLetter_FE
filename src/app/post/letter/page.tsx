import PostLetterContainer from "@/components/letter/PostLetterContainer";
import PostLetterProvider from "@/providers/PostLetterProvider";
import React from "react";

const Page = () => {
  return (
    <section className="w-full bg-[#F7F7F7]">
      <PostLetterProvider>
        <PostLetterContainer />
      </PostLetterProvider>
    </section>
  );
};

export default Page;
