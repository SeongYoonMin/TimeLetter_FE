import DefaultHeader from "@/components/layout/DefaultHeader";
import { Button } from "@/components/ui/button";
import { usePostLetterStore } from "@/providers/PostLetterProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const StepName = ({
  nextPage,
  backPage,
}: {
  nextPage: () => void;
  backPage: () => void;
}) => {
  const { name, setName } = usePostLetterStore((store) => store);
  const scheme = z.object({
    name: z
      .string()
      .min(1, "닉네임은 한글자 이상이어야 합니다.")
      .max(8, "닉네임은 8자 이하여야 합니다.")
      .regex(
        /^[가-힣a-zA-Z0-9]+$/,
        "닉네임은 한글(낱말), 영문, 숫자만 입력 가능합니다."
      )
      .default(name),
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheme),
  });
  const onSubmitName: SubmitHandler<{ name: string }> = async (data) => {
    setName(data.name);
    nextPage();
  };
  const watchName = watch("name");
  return (
    <div className="w-full h-full justify-between flex flex-col items-center gap-4">
      <div className="w-full flex flex-col gap-4 h-full">
        <DefaultHeader backPage={backPage} />
        <form
          onSubmit={handleSubmit(onSubmitName)}
          className="flex flex-col items-center gap-2 p-5 flex-1 justify-between"
        >
          <div className="w-full flex flex-col items-center gap-2">
            <h2 className="text-header text-center">
              보내시는 분의 닉네임을 적어주세요
            </h2>
            <label className="w-full flex flex-col items-start justify-center gap-1 relative">
              <input
                type="text"
                {...register("name")}
                placeholder="닉네임 입력"
                className="font-semibold p-6 bg-[#F7F7F7] placeholder:text-[#D2D2D2] text-[#5E5B5B] rounded-[20px] w-full"
              />
  
              {watchName ? (
                <p className="absolute top-1/2 inline-block right-[20px] -translate-y-1/2 text-[#D2D2D2]">{`${watchName.length}/8`}</p>
              ) : (
                <p className="absolute top-1/2 inline-block right-[20px] -translate-y-1/2 text-[#D2D2D2]">{`0/8`}</p>
              )}
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </label>
          </div>
          <Button type="submit" disabled={!watchName}>
            다음
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StepName;
