import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StepHeader from "./StepHeader";

const StepThree = ({
  step,
  total,
  nickname,
  nextNick,
  back,
}: {
  step: number;
  total: number;
  back: () => void;
  nickname: string;
  nextNick: (value: string) => void;
}) => {
  const scheme = z.object({
    nickname: z
      .string()
      .min(1, "닉네임은 한글자 이상이어야 합니다.")
      .max(8, "닉네임은 8자 이하여야 합니다.")
      .regex(
        /^[가-힣a-zA-Z0-9]+$/,
        "닉네임은 한글(낱말), 영문, 숫자만 입력 가능합니다."
      )
      .default(nickname),
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheme),
  });
  const onSubmitNickname: SubmitHandler<{ nickname: string }> = async (
    data
  ) => {
    nextNick(data.nickname);
  };
  const watchNickname = watch("nickname");
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <StepHeader step={step} total={total} stepBack={back} />

      <form
        onSubmit={handleSubmit(onSubmitNickname)}
        className="flex flex-col flex-1 items-center justify-between px-5"
      >
        <legend className="sr-only">닉네임 입력 폼</legend>
        <div className="w-full flex flex-col items-start justify-center gap-3">
          <h2 className="text-header">타임캡슐에 적혀 있는 내 이름은?</h2>
          <div className="flex flex-col w-full">
            <label className="w-full flex flex-col items-start justify-center gap-1 relative">
              <input
                type="text"
                {...register("nickname")}
                placeholder="닉네임 입력"
                className="font-semibold p-6 bg-[#F7F7F7] placeholder:text-[#D2D2D2] text-[#5E5B5B] rounded-[20px] w-full"
              />

              {watchNickname ? (
                <p className="absolute top-1/2 inline-block right-[20px] -translate-y-1/2 text-[#D2D2D2]">{`${watchNickname.length}/8`}</p>
              ) : (
                <p className="absolute top-1/2 inline-block right-[20px] -translate-y-1/2 text-[#D2D2D2]">{`0/8`}</p>
              )}
            </label>
            {errors.nickname && (
              <p className="text-red-500">{errors.nickname.message}</p>
            )}
          </div>
        </div>
        <div className="w-full pb-5">
          <button
            className="w-full py-[22px] disabled:bg-[#F7F7F7] rounded-[20px] disabled:text-[#8A8686] bg-[#FF9225] text-white disabled:cursor-default cursor-pointer"
            disabled={!watchNickname}
            type="submit"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
