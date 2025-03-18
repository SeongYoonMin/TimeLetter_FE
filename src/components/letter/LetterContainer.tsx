"use client";

import React from "react";
import DefaultHeader from "../layout/DefaultHeader";
import { useRouter } from "next/navigation";
import { usePosterList } from "@/hooks/post";
import { useAuthStore } from "@/providers/AuthProvider";
import { ILetterListProps } from "@/types/letter";
import Link from "next/link";
import { useTransLatestDate } from "@/hooks/utils";

const LetterItems = ({
  id,
  nickname,
  createdAt,
}: {
  id: number;
  nickname: string;
  createdAt: string;
}) => {
  const agoDate = useTransLatestDate(createdAt);
  return (
    <Link
      href={`/letter/${id}`}
      className="flex items-center justify-between p-6 bg-[#F7F7F7] rounded-[20px]"
    >
      <div>
        <p className="text-[#5E5B5B] font-bold text-xl">
          {nickname}
          <span className="font-medium text-base">님의 편지</span>
        </p>
        <p>{agoDate === 0 ? "오늘" : `${agoDate}일전`}</p>
      </div>
      <button
        type="button"
        className="bg-[#FFC000] text-white py-1 px-3 rounded-md"
      >
        편지열기
      </button>
    </Link>
  );
};

const LetterContainer = () => {
  const router = useRouter();
  const { uniqueId } = useAuthStore((store) => store);
  const { data, isLoading } = usePosterList<ILetterListProps>(uniqueId);
  if (isLoading) return null;
  if (!data) return null;

  return (
    <section className="p-5 h-full bg-white">
      <DefaultHeader backPage={() => router.back()} className="mb-3" />
      <p className="text-center py-3 mb-6 text-[#5E5B5B]">
        편지는 받고난 2주 후에 사라져요 소중한
        <br />
        편지는 저장해서 간직해요
      </p>
      <ul>
        {data.map((letter) => {
          return (
            <li key={letter.id} className="mb-3">
              <LetterItems
                nickname={letter.postUserNickName}
                createdAt={letter.createdAt}
                id={letter.id}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default LetterContainer;
