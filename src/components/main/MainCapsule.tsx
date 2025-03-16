"use client";

import React from "react";
import Image from "next/image";

const ImageBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 w-[200px] lg:w-full lg:max-w-[400px]">
      {children}
    </div>
  );
};

const MainCapsule = ({
  postCount,
  newCount,
  capsule,
}: {
  postCount: number;
  newCount: number;
  capsule: string;
}) => {
  console.log(newCount);
  if (postCount === 0)
    return (
      <ImageBox>
        <Image
          width={400}
          height={400}
          alt={capsule}
          className="w-full"
          src={`/img/${capsule}.png`}
        />
      </ImageBox>
    );
  if (postCount === 1)
    return (
      <ImageBox>
        <Image
          width={400}
          height={400}
          alt={capsule}
          className="w-full"
          src={`/img/${capsule}_one.png`}
        />
      </ImageBox>
    );
  if (postCount === 2)
    return (
      <ImageBox>
        <Image
          width={400}
          height={400}
          alt={capsule}
          className="w-full"
          src={`/img/${capsule}_two.png`}
        />
      </ImageBox>
    );
  return (
    <ImageBox>
      <Image
        width={400}
        height={400}
        alt={capsule}
        className="w-full"
        src={`/img/${capsule}_multi.png`}
      />
    </ImageBox>
  );
};

export default MainCapsule;
