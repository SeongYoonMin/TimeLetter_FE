"use client";

import {
  useMultipleContent,
  usePosterDetail,
  useSingleContent,
} from "@/hooks/post";
import { useAuthStore } from "@/providers/AuthProvider";
import React, { useEffect } from "react";
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
  const [firstContent, setFirstContent] = React.useState<string[]>([]);
  const [lastContent, setLastContent] = React.useState<string[]>([]);
  const [favoriteContent, setFavoriteContent] = React.useState<string>("");
  const singleContent = useSingleContent;
  const multipleContent = useMultipleContent;
  const router = useRouter();
  useEffect(() => {
    if (data) {
      setFirstContent(JSON.parse(data.firstView));
      setLastContent(JSON.parse(data.latestView));
      setFavoriteContent(data.favoriteView);
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>데이터가 존재하지 않습니다.</div>;
  return (
    <section className="p-5 h-full bg-white flex flex-col justify-between">
      <div className="flex flex-col items-center gap-3 w-full">
        <DefaultHeader backPage={() => router.back()} />
        <div className="w-full flex-1 flex-col items-center justify-center gap-6 flex">
          <h2 className="text-header text-center">{data.postTitle}</h2>
          <div className="flex flex-col items-start justify-between p-6 bg-[#F7F7F7] rounded-[20px] w-full break-keep gap-3">
            <p>
              {firstContent.length === 1
                ? singleContent(firstContent[0])
                : multipleContent(firstContent)}
            </p>
            <p>
              {lastContent.length === 1
                ? singleContent(lastContent[0])
                : multipleContent(lastContent)}
            </p>
            <p>{singleContent(favoriteContent)}</p>
            <p>{data.postContent}</p>
          </div>
        </div>
      </div>
      <Button>저장</Button>
    </section>
  );
};

export default LetterDetailContainer;
