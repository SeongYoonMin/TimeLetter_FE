"use client";

import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { useAuthStore } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

interface ILoginInput {
  userId: string;
  password: string;
}

const schema = z.object({
  userId: z
    .string()
    .min(4, "올바른 아이디를 입력해주세요.")
    .regex(/^[a-zA-Z0-9]+$/, "올바른 아이디를 입력해주세요."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다")
    .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, "올바른 비밀번호를 입력해주세요."),
});

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const authStore = useAuthStore((store) => store);
  const router = useRouter();
  const toastify = toast;
  const watchUserId = watch("userId");
  const watchPassword = watch("password");
  const onLoginSubmit: SubmitHandler<ILoginInput> = async (data) => {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("password", data.password);
    const response = await fetch("/api/capsular/login", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      
      const user: {
        id: number;
        nickName: string;
        userId: string;
        background: string;
        capsule: string;
        uniqueId: string;
      } = await response.json();
      authStore.setAuthorization({ isLogin: true, ...user });
      router.push("/");
    } else {
      const getError: { error: string } = await response.json();
      toastify.error(getError.error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="flex flex-col items-center flex-1 justify-between"
    >
      <legend className="sr-only">로그인 폼</legend>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <label className="w-full flex flex-col items-start justify-center gap-1">
          <input
            type="text"
            className="font-semibold p-6 bg-[#F7F7F7] placeholder:text-[#D2D2D2] text-[#5E5B5B] rounded-[20px] w-full"
            {...register("userId")}
            placeholder="아이디 입력"
          />
          {errors.userId && (
            <span className="text-sm text-red-500">
              {errors.userId.message}
            </span>
          )}
        </label>
        <label className="w-full flex flex-col items-start justify-center gap-1">
          <input
            type="password"
            className="font-semibold p-6 bg-[#F7F7F7] placeholder:text-[#D2D2D2] text-[#5E5B5B] rounded-[20px] w-full"
            {...register("password")}
            placeholder="비밀번호 입력"
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </label>
      </div>
      <div className="flex flex-col w-full gap-5 items-center">
        <Link href="/register" className=" font-semibold text-[#8A8686]">
          내 타임 캡슐 만들기
        </Link>
        <button
          type="submit"
          disabled={!watchUserId || !watchPassword}
          className="w-full py-[22px] disabled:bg-[#F7F7F7] rounded-[20px] disabled:text-[#8A8686] bg-[#FF9225] text-white disabled:cursor-default cursor-pointer"
        >
          확인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
