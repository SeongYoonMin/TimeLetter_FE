"use client";

import { usePosterDetail } from "@/hooks/post";
import { useAuthStore } from "@/providers/AuthProvider";
import React from "react";
import DefaultHeader from "../layout/DefaultHeader";
import { useRouter } from "next/navigation";
import { ILetterDetailProps } from "@/types/letter";
import { Button } from "../ui/button";

const LetterDetailContainer = ({ id }: { id: number }) => {
  const { uniqueId } = useAuthStore((store) => store);
  const { data, isLoading } = usePosterDetail<ILetterDetailProps>({
    id,
    uniqueId,
  });
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>데이터가 존재하지 않습니다.</div>;
  return (
    <section className="p-5 h-full bg-white flex flex-col justify-between">
      <div className="flex flex-col items-center gap-3 w-full">
        <DefaultHeader backPage={() => router.back()} />
        <div className="w-full flex-1 flex-col items-center justify-center gap-6">
          <h2 className="text-header text-center">{data.postTitle}</h2>
          <div className="flex items-center justify-between p-6 bg-[#F7F7F7] rounded-[20px]">
            {data.postContent}
          </div>
        </div>
      </div>
      <Button>저장</Button>
    </section>
  );
};

export default LetterDetailContainer;
