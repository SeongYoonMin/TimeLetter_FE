import React from "react";
import StepHeader from "./StepHeader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterStore } from "@/providers/RegisterProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const scheme = z
  .object({
    id: z
      .string()
      .min(4, "아이디는 최소 4글자 이상이여야 합니다.")
      .regex(/^[A-Za-z0-9]+$/, "아이디는 영문과 숫자만 가능합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
      .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
      .regex(
        /^[A-Za-z0-9!@#$%^&*]+$/,
        "비밀번호는 영문, 숫자, ! ~ * 특수문자만 가능합니다."
      ),
    passwordConfirm: z
      .string()
      .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
      .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
      .regex(
        /^[A-Za-z0-9!@#$%^&*]+$/,
        "비밀번호는 영문, 숫자, ! ~ * 특수문자만 가능합니다."
      ),
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.passwordConfirm) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
      });
    }
  });

const StepFour = ({
  step,
  total,
  back,
}: {
  step: number;
  total: number;
  back: () => void;
}) => {
  const toastify = toast;
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheme),
  });
  const watchId = watch("id");
  const watchPassword = watch("password");
  const watchPasswordConfirm = watch("passwordConfirm");
  const registerStore = useRegisterStore((store) => store);
  const onSubmitAuth: SubmitHandler<{
    id: string;
    password: string;
    passwordConfirm: string;
  }> = async (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("password", data.password);
    formData.append("background", registerStore.background);
    formData.append("capsule", registerStore.capsule);
    formData.append("nickname", registerStore.nickname);

    const response = await fetch("/api/capsular/register", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      if (response.status === 409) {
        toastify.error("이미 존재하는 아이디입니다.");
        router.push("/login");
      }
      return;
    }

    toastify.success(`회원가입을 진심으로 환영합니다!`);
    router.push("/login");
  };
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <StepHeader step={step} total={total} stepBack={back} />
      <form
        onSubmit={handleSubmit(onSubmitAuth)}
        className="flex flex-col items-center justify-between px-5 flex-1 pb-5"
      >
        <legend className="sr-only">회원가입 폼</legend>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <h2 className="text-2xl font-bold text-[#5E5B5B] mb-5">
            회원정보 입력
          </h2>
          <label
            htmlFor="id"
            className="w-full flex flex-col items-start gap-1"
          >
            <input
              className="font-semibold p-6 bg-[#F7F7F7] placeholder:text-[#D2D2D2] text-[#5E5B5B] rounded-[20px] w-full"
              type="text"
              id="id"
              {...register("id")}
              placeholder="아이디 입력"
            />
            {errors.id && (
              <span className="text-sm text-red-500">{errors.id.message}</span>
            )}
          </label>
          <label
            htmlFor="password"
            className="w-full flex flex-col items-start gap-1"
          >
            <input
              id="password"
              className="font-semibold p-6 bg-[#F7F7F7] placeholder:text-[#D2D2D2] text-[#5E5B5B] rounded-[20px] w-full"
              type="password"
              {...register("password")}
              placeholder="비밀번호 입력"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>
          <label
            htmlFor="passwordConfirm"
            className="w-full flex flex-col items-start gap-1"
          >
            <input
              id="passwordConfirm"
              className="font-semibold p-6 bg-[#F7F7F7] placeholder:text-[#D2D2D2] text-[#5E5B5B] rounded-[20px] w-full"
              type="password"
              {...register("passwordConfirm")}
              placeholder="비밀번호 확인"
            />
            {errors.passwordConfirm && (
              <span className="text-sm text-red-500">
                {errors.passwordConfirm.message}
              </span>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-[22px] disabled:bg-[#F7F7F7] rounded-[20px] disabled:text-[#8A8686] bg-[#FF9225] text-white disabled:cursor-default cursor-pointer"
          disabled={!watchId || !watchPassword || !watchPasswordConfirm}
        >
          완료
        </button>
      </form>
    </div>
  );
};

export default StepFour;
