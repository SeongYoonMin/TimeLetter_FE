import DefaultHeader from "@/components/layout/DefaultHeader";
import { Button } from "@/components/ui/button";
import { usePostLetterStore } from "@/providers/PostLetterProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";

const StepFive = ({
  nextPage,
  backPage,
}: {
  nextPage: () => void;
  backPage: () => void;
}) => {
  const {
    setPostLastContent,
    userId,
    firstView,
    lastView,
    favoriteView,
    postContent,
    initPostLetter,
    name,
  } = usePostLetterStore((store) => store);
  const scheme = z.object({
    postLastContent: z.string().max(100, "최대 100자까지 입력 가능합니다."),
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheme),
  });
  const onSubmitPostLastContent: SubmitHandler<{ postLastContent: string }> = async (
    data
  ) => {
    setPostLastContent(data.postLastContent);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userId", userId);
    formData.append("firstView", JSON.stringify(firstView));
    formData.append("lastView", JSON.stringify(lastView));
    formData.append("favoriteView", favoriteView);
    formData.append("postContent", postContent);
    formData.append("postLastContent", data.postLastContent);

    const response = await fetch("/api/post", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("제출 중 오류가 발생했습니다.");
    }
    console.log("제출 성공!");
    initPostLetter();
    nextPage();
  };
  const watchPostContent = watch("postLastContent");
  return (
    <form
      onSubmit={handleSubmit(onSubmitPostLastContent)}
      className="w-full h-full justify-between flex flex-col items-center gap-4"
    >
      <div className="w-full flex flex-col gap-4">
        <DefaultHeader backPage={backPage} />
        <div className="flex flex-col items-center gap-2">
          <legend className="text-header text-center">
            그때의 친구에게
            <br />
            해주고 싶었던 말을 건네보세요
          </legend>
        </div>
        <label className="w-full relative">
          <textarea
            className="bg-[#F7F7F7] p-6 rounded-3xl relative z-0 w-full"
            {...register("postLastContent")}
            rows={8}
            placeholder="내용을 입력해주세요."
          ></textarea>
          <span className="text-[#D2D2D2] absolute bottom-6 right-6 z-10">
            {watchPostContent ? watchPostContent.length : 0}/100
          </span>
        </label>
        {errors.postLastContent && (
          <span className="text-red-500">{errors.postLastContent.message}</span>
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <button className="text-[#8A8686]" type="submit">
          건너뛰기
        </button>
        <Button type="submit" disabled={!watchPostContent}>
          다음
        </Button>
      </div>
    </form>
  );
};

export default StepFive;
