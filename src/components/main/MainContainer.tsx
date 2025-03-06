"use client";

import React, { useEffect, useState } from "react";
import OnboardingContainer from "../onboarding/OnboardingContainer";
import { useFirstVisitorStore } from "@/providers/FirstVisitorProvider";

const MainContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const firstVisitorStore = useFirstVisitorStore((store) => store);
  const handleFirstVisit = () => {
    firstVisitorStore.setFirstVisitor(true);
  };
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) return null;
  return (
    <>
      {firstVisitorStore.firstVisitor ? (
        <OnboardingContainer handleFirstVisitor={handleFirstVisit} />
      ) : (
        <div>메인</div>
      )}
    </>
  );
};

export default MainContainer;
