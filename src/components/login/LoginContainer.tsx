"use client";

import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useAuthStore } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const LoginContainer = () => {
  const authStore = useAuthStore((store) => store);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(false);
  }, []);
  useEffect(() => {
    if (authStore.isLogin && !isLoading) {
      router.push("/");
    }
  }, [authStore.isLogin, router, isLoading]);
  if (isLoading) return null;
  return (
    <section className="w-full h-full bg-white flex flex-col px-5 pb-5 pt-[72px]">
      <h1 className="text-header text-center py-10">내 타임캡슐 확인하기</h1>
      <LoginForm />
    </section>
  );
};

export default LoginContainer;
