import React from "react";
import Image from "next/image";

const PostLetterHeader = ({
  backPage,
  className,
}: {
  backPage: () => void;
  className?: string;
}) => {
  return (
    <header className={`flex w-full ${className}`}>
      <button title="뒤로가기" onClick={backPage} className="cursor-pointer">
        <Image
          src={"/icons/back_icon.svg"}
          width={40}
          height={40}
          alt="뒤로가기"
          className="w-12 h-12"
        />
      </button>
    </header>
  );
};

export default PostLetterHeader;
