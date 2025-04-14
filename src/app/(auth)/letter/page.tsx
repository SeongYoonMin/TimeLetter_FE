import dynamic from "next/dynamic";
import React from "react";

const Letter = dynamic(() => import("@/components/letter/LetterContainer"));

const Page = () => {
  return (
    <>
      <Letter />
    </>
  );
};

export default Page;
