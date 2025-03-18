"use client";

import React, { useEffect, useState } from "react";
import OnboardingContainer from "../onboarding/OnboardingContainer";
import { useFirstVisitorStore } from "@/providers/FirstVisitorProvider";
import { useAuthStore } from "@/providers/AuthProvider";
import { Button } from "../ui/button";
import MainCapsule from "./MainCapsule";
import Link from "next/link";
import { usePosterCount } from "@/hooks/post";

interface IAuthProps {
  nickName: string;
  capsule: string;
  uniqueId: string;
}

const MainContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const firstVisitorStore = useFirstVisitorStore((store) => store);
  const authStore = useAuthStore((store) => store);

  const handleFirstVisit = () => {
    firstVisitorStore.setFirstVisitor(true);
  };
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null;
  if (firstVisitorStore.firstVisitor && !authStore.isLogin) {
    return <OnboardingContainer handleFirstVisitor={handleFirstVisit} />;
  }
  return (
    <section
      className="w-full h-full bg-cover flex flex-col items-center justify-between pb-4 pt-[72px] px-5"
      style={{ backgroundImage: `url(${authStore.background})` }}
    >
      <h1 className="text-center w-full text-header text-[#3C3C3C]">
        {authStore.nickName}님의
        <br />
        타임캡슐
      </h1>
      <CapsuleContainer
        nickName={authStore.nickName}
        capsule={authStore.capsule}
        uniqueId={authStore.uniqueId}
      />
      <Button variant={"secondary"}>친구에게 공유하고 편지 받기</Button>
    </section>
  );
};

const CapsuleContainer = ({ nickName, capsule, uniqueId }: IAuthProps) => {
  const { data, isLoading } = usePosterCount({
    nickname: nickName,
    capsule,
    uniqueId,
  });
  if (isLoading) return null;
  if (!data) return null;
  return (
    <article className="pt-6 pb-8 px-5 relative flex w-full flex-col items-center justify-center gap-6">
      <div className=" opacity-60 bg-default absolute inset-0 top-0 left-0 right-0 bottom-0 z-0 rounded-[20px]" />
      <MainCapsule
        postCount={data.postCount}
        newCount={data.newPostCount}
        capsule={capsule}
      />
      <Link
        href={data.newPostCount > 0 ? "/post" : "#none"}
        className="text-center"
      >
        {data.newPostCount > 0
          ? "지금까지 받은 편지 보기"
          : "지금 바로 공유하고\n첫 편지를 받아보세요"}
      </Link>
    </article>
  );
};

export default MainContainer;
