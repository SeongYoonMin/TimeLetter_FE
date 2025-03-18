"use client";

import React from "react";
import Image from "next/image";

const StepHeader = ({
  step,
  total,
  stepBack,
}: {
  step: number;
  total: number;
  stepBack: () => void;
}) => {
  return (
    <div className="w-full flex justify-start items-center relative p-5">
      <button type="button" title="뒤로가기" onClick={stepBack} className="cursor-pointer">
        <Image
          src="/icons/back_icon.svg"
          alt="뒤로가기"
          width={48}
          height={48}
        />
      </button>
      <div className="flex items-center justify-center gap-1 text-[#441606] text-body absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p>{step + 1}</p>
        <p>/</p>
        <p>{total}</p>
      </div>
    </div>
  );
};

export default StepHeader;
