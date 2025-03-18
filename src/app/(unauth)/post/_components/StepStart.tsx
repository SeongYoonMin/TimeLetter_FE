"use client";

import DefaultHeader from "@/components/layout/DefaultHeader";
import { Button } from "@/components/ui/button";
import { usePostLetterStore } from "@/providers/PostLetterProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const StepStart = ({ nextPage }: { nextPage: () => void }) => {
  const router = useRouter();
  const { background, capsule, nickname } = usePostLetterStore(
    (store) => store
  );
  const [isLoading, setIsLoading] = useState(true);
  const backPage = useCallback(() => {
    router.back();
  }, [router]);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) return null;
  return (
    <div className="w-full flex flex-col justify-between items-center relative pt-5 pb-4 px-5 box-border h-full">
      <DefaultHeader backPage={backPage} className="relative z-10" />
      <Image
        alt={background}
        src={background}
        width={720}
        height={1080}
        className="w-full h-full absolute z-0 inset-0"
      />
      <div className="w-full h-full absolute z-[1] inset-0 bg-gradient-to-b to-white from-transparent"></div>
      <div className="relative z-10">
        <Image
          src={`/img/${capsule}.png`}
          width={400}
          height={400}
          className="w-[200px] lg:w-[400px]"
          alt={capsule}
        />
        <p className="text-header text-center">
          {nickname}님이
          <br />
          편지를 기다리고 있어요
        </p>
      </div>
      <Button onClick={nextPage} className="relative z-10">
        다음
      </Button>
    </div>
  );
};

export default StepStart;
